using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Models;
using MatrixScrabble.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace MatrixScrabble.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WordController : ControllerBase
{
	private readonly IGameService gameService;
	private readonly ILogger<WordController> _logger;

	public WordController(ILogger<WordController> logger, IGameService gameService)
	{
		this.gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));

		_logger = logger;
	}

	[Route("ConfirmGame")]
	[HttpPost]
	public async Task<ActionResult<Board>> ConfirmGame(GameDto game)
	{
		if (game.Id == null)
			throw new ArgumentException($"'{nameof(game.Id)}' cannot be null or whitespace.", nameof(game.Id));

		var completedGame = await gameService.ConfirmGame(game, new Guid());

		return Ok(completedGame);
	}

	[Route("CheckWordAllowance")]
	[HttpPost]
	public async Task<Boolean> CheckWordAllowance(CheckWordAllowanceDto checkWordAllowanceDto)
	{
		if (checkWordAllowanceDto == null)
			throw new ArgumentException($"'{nameof(checkWordAllowanceDto)}' cannot be null or whitespace.", nameof(checkWordAllowanceDto));

		if (String.IsNullOrWhiteSpace(checkWordAllowanceDto.Language) || string.IsNullOrWhiteSpace(checkWordAllowanceDto.Word))
			throw new ArgumentException($"'{nameof(checkWordAllowanceDto)}' cannot be null or whitespace.", nameof(checkWordAllowanceDto));

		return DictionaryService.WordExists(checkWordAllowanceDto.Word.ToLower(), checkWordAllowanceDto.Language);
	}
}
