using MatrixScrabble.Server.Attributes;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace MatrixScrabble.Server.Controllers;

[ApiController]
[Route("[controller]")]
[NotFoundOnException(typeof(ResourceNotFoundException))]
public class GamesController : ControllerBase
{
	private readonly IGameService gameService;
	private Guid _userId;

	public GamesController(IGameService gameService)
	{
		this.gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));

		if (_userId == Guid.Empty)
		{
			_userId = Guid.NewGuid();
		}
	}

	[HttpGet]
	public async Task<ActionResult<IEnumerable<GameDto>>> GetAll()
	{
		var games = await gameService.GetAllAsync(_userId);

		return Ok(games);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<GameDto>> Get(Guid id)
	{
		if (string.IsNullOrWhiteSpace(id.ToString()))
			throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

		var game = await gameService.GetAsync(id, _userId);

		return Ok(game);
	}

	[HttpPost]
	public async Task<IActionResult> Create(CreateGameDto game)
	{
		if (game is null)
			throw new ArgumentNullException(nameof(game));
		if (string.IsNullOrWhiteSpace(game.Language))
			throw new ArgumentNullException(nameof(game));

		var createdGame = await gameService.CreateAsync(game, _userId);

		return CreatedAtAction(nameof(Get), new { id = createdGame.Id }, createdGame);
	}

	[HttpPut]
	public async Task<IActionResult> Update(GameDto updatedGame)
	{
		if (updatedGame is null)
			throw new ArgumentNullException(nameof(updatedGame));

		var gameDetails = await gameService.UpdateAsync(updatedGame.Id, updatedGame, _userId);

		return Ok(gameDetails);
	}

	[HttpDelete("{id:length(36)}")]
	public async Task<IActionResult> Delete(Guid id)
	{
		if (string.IsNullOrWhiteSpace(id.ToString()))
			throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

		await gameService.RemoveAsync(id, _userId);

		return NoContent();
	}
}
