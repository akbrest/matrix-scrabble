using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Models.context;

namespace MatrixScrabble.Server.Mappers
{
    public class GameMapper : IGameMapper
    {
        GameDto IGameMapper.Map(Game game)
        {
            if (game is null)
                throw new ArgumentNullException(nameof(game));

            return new GameDto
            {
                Id = game.Id,
                Word = game.Word,
                IsCompleted = game.IsCompleted.Value,
				Language = game.Language,
				CreatedAt = game.DateCreated
            };
        }

        Game IGameMapper.Map(GameDto gameDto)
        {
            if (gameDto is null)
                throw new ArgumentNullException(nameof(gameDto));

			return new Game
			{
				Id =  Guid.NewGuid(),
				Word = gameDto.Word,
				Language = gameDto.Language,
				IsCompleted = gameDto.IsCompleted,
				DateCreated = gameDto.CreatedAt.HasValue ? gameDto.CreatedAt.Value : DateTime.UtcNow,
				Board = ""
            };
        }
    }
}
