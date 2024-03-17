using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Helpers;
using MatrixScrabble.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace MatrixScrabble.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WordController : ControllerBase
{
	private readonly ILogger<WordController> _logger;
	private readonly IGameService _gameService;
	private readonly IDictionaryHelper _dictionaryHelper;

	public WordController(ILogger<WordController> logger, IGameService gameService, IDictionaryHelper dictionaryHelper)
	{
		_logger = logger ?? throw new ArgumentNullException(nameof(logger));
		_gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));
		_dictionaryHelper = dictionaryHelper ?? throw new ArgumentNullException(nameof(dictionaryHelper));
	}

	[Route("ConfirmGame")]
	[HttpPost]
	public async Task<ActionResult<GameDto>> ConfirmGame(GameDto game)
	{
		if (game is null)
			throw new ArgumentNullException(nameof(game));

		var completedGame = await _gameService.ConfirmGame(game, new Guid());

		return Ok(completedGame);
	}

	[Route("CheckWordAllowance")]
	[HttpPost]
	public async Task<bool> CheckWordAllowance(CheckWordAllowanceDto checkWordAllowanceDto)
	{
		if (checkWordAllowanceDto is null)
			throw new ArgumentNullException(nameof(checkWordAllowanceDto));

		if (string.IsNullOrWhiteSpace(checkWordAllowanceDto.Word))
			throw new ArgumentException($"'{nameof(checkWordAllowanceDto)}' cannot be null or whitespace.", nameof(checkWordAllowanceDto));

		return _dictionaryHelper.IsWordExists(checkWordAllowanceDto.Word.ToLower(), checkWordAllowanceDto.Language);
	}
}
