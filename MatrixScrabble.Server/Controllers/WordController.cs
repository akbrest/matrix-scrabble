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
    private readonly ILogger<WordController> _logger;

    public WordController(ILogger<WordController> logger, IGameService gameService)   
    {
        this.gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));

        _logger = logger;
    }

    [Route("ConfirmGame")]
    [HttpPost]
    public async Task<ActionResult<Game>> ConfirmGame(GameDto game)
    {
        if (game.Id == null)
            throw new ArgumentException($"'{nameof(game.Id)}' cannot be null or whitespace.", nameof(game.Id));
		
		var completedGame = await gameService.ConfirmGame(game);

        return Ok(completedGame);

    }
}
