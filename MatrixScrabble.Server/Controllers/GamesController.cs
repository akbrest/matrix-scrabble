using MatrixScrabble.Server.Attributes;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace MatrixScrabble.Server.Controllers;

[ApiController]
[Route("[controller]")]
[NotFoundOnException(typeof(ResourceNotFoundException))]
[GeneralExceptionOnException(typeof(GeneralException))]
public class GamesController : ControllerBase
{
    private readonly IGameService _gameService;
    private Guid _userId;

    public GamesController(IGameService gameService)
    {
        _gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));

        if (_userId == Guid.Empty)
        {
            _userId = Guid.NewGuid();
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GameDto>>> GetAll()
    {
        var games = await _gameService.GetAllAsync(_userId);

        return Ok(games);
    }

    [HttpGet("{id:length(36)}")]
    public async Task<ActionResult<GameDto>> Get(Guid id)
    {
        var game = await _gameService.GetAsync(id, _userId);

        return Ok(game);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateGameDto game)
    {
        if (game is null)
            throw new ArgumentNullException(nameof(game));

        var createdGame = await _gameService.CreateAsync(game, _userId);

        return CreatedAtAction(nameof(Get), new { id = createdGame.Id }, createdGame);
    }

    [HttpPut]
    public async Task<IActionResult> Update(GameDto updatedGame)
    {
        if (updatedGame is null)
            throw new ArgumentNullException(nameof(updatedGame));

        var gameDetails = await _gameService.UpdateAsync(updatedGame.Id, updatedGame, _userId);

        return Ok(gameDetails);
    }

    [HttpDelete("{id:length(36)}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _gameService.RemoveAsync(id, _userId);

        return NoContent();
    }

    //TODO move to separate controller
    [HttpPut("{id:length(36)}/words/{wordOrderId:int}")]
    public async Task<ActionResult<AnswerWordDto>> ConfirmWord(Guid id, int wordOrderId, AnswerWordDto answerWord)
    {
        if (wordOrderId <= 0)
            throw new ArgumentOutOfRangeException(nameof(wordOrderId));
        if (answerWord is null)
            throw new ArgumentNullException(nameof(answerWord));

        var answer = await _gameService.ConfirmWord(id, wordOrderId, answerWord, _userId);

        return Ok(answer);
    }
}
