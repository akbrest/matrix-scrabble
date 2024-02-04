using MatrixScrabble.Server.Models;
using MatrixScrabble.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace MatrixScrabble.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WordController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WordController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [Route("ConfirmGame")]
        [HttpPost]
        public ActionResult<Game> ConfirmGame(Game value)
        {
            var val = new Game();
            //val.Name = "Post:" + Guid.NewGuid().ToString();

            return Ok(value);
        }

        [Route("CreateGame")]
        [HttpPost]
        public ActionResult<Game> CreateGame(CreateGame createGame)
        {
            // check game??

            var val = new Game();
            val.ID = Guid.NewGuid();
            string[,] numbers = { { "d", "d", "d" }, { "d", "d", "" } };

            List<List<string>> board = new List<List<string>>();

            val.Board = board;

            return Ok(val);
        }
    }
}
