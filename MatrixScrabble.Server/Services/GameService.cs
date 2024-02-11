using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Repositories;
using MatrixScrabble.Server.Models.context;
using System.Text.Json;

namespace MatrixScrabble.Server.Services;

public class GameService : IGameService
{
    private readonly ISqlRepository<Game> gameRepository;
	
	 private readonly IGameMapper gameMapper;

    public GameService(ISqlRepository<Game> gameRepository, IGameMapper gameMapper)
    {
        this.gameRepository = gameRepository
            ?? throw new ArgumentNullException(nameof(gameRepository));
        this.gameMapper = gameMapper
            ?? throw new ArgumentNullException(nameof(gameMapper));
	}

    async Task<IEnumerable<GameDto>> IGameService.GetAsync()
    {
        var games = await gameRepository.GetAllAsync();

        return games.Select(gameMapper.Map);
    }

    async Task<GameDto?> IGameService.GetAsync(Guid id)
    {
        if ((id == null))
            throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

        var game = await gameRepository.GetAsync(id);

        if (game is null)
            throw new ResourceNotFoundException();

        return gameMapper.Map(game);
    }

    async Task<GameDto> IGameService.CreateAsync(GameDto gameDto)
    {
        if (gameDto is null)
            throw new ArgumentNullException(nameof(gameDto));

        var game = gameMapper.Map(gameDto);

        // TODO use Factory
        game.DateCreated = DateTime.UtcNow;
        game.IsCompleted = false;

        var createdGame = await gameRepository.CreateAsync(game, null);

        return gameMapper.Map(createdGame);
    }

    async Task<GameDto> IGameService.ConfirmGame(GameDto gameDto)
    {
		if (gameDto is null)
			throw new ArgumentNullException(nameof(gameDto));

		if (gameDto.Id is null)
			throw new ArgumentNullException(nameof(gameDto));

		var existingGame = await gameRepository.GetAsync(gameDto.Id.Value);

		List<string> wordList = new List<string>();

		int length = 4;

		int counter = 0;
		/*
		while (counter < length)
		{
			wordList.Add(String.Concat(gameDto.Game.Left[counter], existingGame.Word[counter], gameDto.Game.Board[counter], existingGame.Word[existingGame.Word.Length - counter], gameDto.Game.Right[counter]));
			counter++;
		}

		if (wordList.Contains(existingGame.Word))
		{
			throw new SameWordUsedException();
		}
		*/

		if (existingGame is null)
            throw new ResourceNotFoundException();

        existingGame.IsCompleted = true;
		existingGame.Game1 = JsonSerializer.Serialize(gameDto.Game);
		/*
			existingGame.Field = new Field() { };
			existingGame.Field.Right = gameDto.Game.Right;
			existingGame.Field.Left = gameDto.Game.Left;
			existingGame.Field.Main = gameDto.Game.Board;
		*/
		var updatedGame = await gameRepository.UpdateAsync(existingGame);

        return gameMapper.Map(updatedGame);
    }

    async Task<GameDto> IGameService.UpdateAsync(Guid id, GameDto gameDto)
    {
        if (id == null)
            throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));
        if (gameDto is null)
            throw new ArgumentNullException(nameof(gameDto));

        var existingGame = await gameRepository.GetAsync(id);

        if (existingGame is null)
            throw new ResourceNotFoundException();

        existingGame.Word = gameDto.Word;

        var updatedGame = await gameRepository.UpdateAsync(existingGame);

        return gameMapper.Map(updatedGame);
    }

    async Task IGameService.RemoveAsync(Guid id)
    {

		if (id == null)
			throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

		if (string.IsNullOrWhiteSpace(id.ToString()))
            throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

        var existingGame = await gameRepository.GetAsync(id);

        if (existingGame is null)
            throw new ResourceNotFoundException();

        await gameRepository.DeleteAsync(existingGame);
    }
}
