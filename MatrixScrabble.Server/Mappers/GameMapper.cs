using MatrixScrabble.Server.DataLayer.Entities;
using MatrixScrabble.Server.Dtos;

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
                IsCompleted = game.IsCompleted,
                CreatedAt = game.CreatedAt
            };
        }

        Game IGameMapper.Map(GameDto gameDto)
        {
            if (gameDto is null)
                throw new ArgumentNullException(nameof(gameDto));

            return new Game
            {
                Id = gameDto.Id,
                Word = gameDto.Word,
                IsCompleted = gameDto.IsCompleted,
                CreatedAt = gameDto.CreatedAt.HasValue?gameDto.CreatedAt.Value : DateTime.Now,
				Field = new Field()
				{
					ID = null,
					Left = gameDto.Game?.Left,
					Right = gameDto.Game?.Right,
					Main = gameDto.Game?.Board,
				},
			

            };
        }
    }
}
