using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Dtos.Enums;
using MatrixScrabble.Server.Models.Сontext;

namespace MatrixScrabble.Server.Mappers;

public class GameMapper : IGameMapper
{
	GameDto IGameMapper.Map(Game game)
	{
		if (game is null)
			throw new ArgumentNullException(nameof(game));

		if (!Enum.TryParse<LanguageDto>(game.Language, true, out var language))
			throw new Exception(Constants.ErrorMessage.InvalidLanguage);

		return new GameDto
		{
			Id = game.Id,
			Word = game.Word,
			IsCompleted = game.IsCompleted,
			Language = language,
			CreatedAt = game.DateCreated,
		};
    }

	Game IGameMapper.Map(GameDto gameDto)
	{
		if (gameDto is null)
			throw new ArgumentNullException(nameof(gameDto));

		return new Game
		{
			Id = Guid.NewGuid(),
			Word = gameDto.Word,
			Language = gameDto.Language.ToString(),
			IsCompleted = gameDto.IsCompleted,
			DateCreated = gameDto.CreatedAt.HasValue ? gameDto.CreatedAt.Value : DateTime.UtcNow,
			Board = string.Empty
		};
	}

	Game IGameMapper.Map(CreateGameDto gameDto)
	{
		if (gameDto is null)
			throw new ArgumentNullException(nameof(gameDto));

		return new Game
		{
			Word = gameDto.Word,
			Language = gameDto.Language.ToString(),
			DateCreated = DateTime.UtcNow,
			IsCompleted = false
		};
	}
}
