using MatrixScrabble.Server.Attributes;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace MatrixScrabble.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [NotFoundOnException(typeof(ResourceNotFoundException))]

    public class GamesController : ControllerBase
    {
        private readonly IGameService gameService;
        public GamesController(IGameService gameService)
        {
            this.gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameDto>>> GetAll()
        {
            var games = await gameService.GetAsync();

            return Ok(games);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

            var game = await gameService.GetAsync(id);

            return Ok(game);
        }

        [HttpPost]
        public async Task<IActionResult> Create(GameDto game)
        {
            if (game is null)
                throw new ArgumentNullException(nameof(game));

            var createdGame = await gameService.CreateAsync(game);

            return CreatedAtAction(nameof(Get), new { id = createdGame.Id }, createdGame);
        }


        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, GameDto updatedGame)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));
            if (updatedGame is null)
                throw new ArgumentNullException(nameof(updatedGame));

            var game = await gameService.UpdateAsync(id, updatedGame);

            return Ok(game);
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));
            
            await gameService.RemoveAsync(id);

            return NoContent();
        }
    }
}
