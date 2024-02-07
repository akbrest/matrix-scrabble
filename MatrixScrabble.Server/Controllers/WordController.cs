using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Models;
using MatrixScrabble.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace MatrixScrabble.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WordController : ControllerBase
{
    private readonly IGameService gameService;

    private readonly ILogger<TestController> _logger;

    public WordController(ILogger<TestController> logger, IGameService gameService, IDictionaryService dictionaryService)
    {
        this.gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));

        _logger = logger;
    }

    [Route("ConfirmGame")]
    [HttpPost]
    public async Task<ActionResult<Game>> ConfirmGame(Game game)
    {
        if (string.IsNullOrWhiteSpace(game.ID))
            throw new ArgumentException($"'{nameof(game.ID)}' cannot be null or whitespace.", nameof(game.ID));

        GameDto gameDto = new GameDto()
        {
            CreatedAt = DateTime.UtcNow,
            Id = game.ID,
            IsCompleted = true,
            Word = "",
            Game = new Game()
            {
                Board = game.Board,
                Left = game.Left,
                Right = game.Right,
            }
        };

        var completedGame = await gameService.ConfirmGame(gameDto);

        return Ok(game);

    }
}
