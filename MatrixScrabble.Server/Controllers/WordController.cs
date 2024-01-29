using MatrixScrabble.Server.Models;
using MatrixScrabble.Server.Services;
using Microsoft.AspNetCore.Http;
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
        public ActionResult<Board> ConfirmGame(Board value)
        {

            var val = new Board();
            val.Name = "Post:" + Guid.NewGuid().ToString();

            return Ok(value);
        }

        [Route("CreateGame")]
        [HttpPost]
        public ActionResult<Board> CreateGame(CreateGame word)
        {
            var val = new Board();
            val.Name = "Post:" + Guid.NewGuid().ToString();

            return Ok(val);
        }
    }
}
