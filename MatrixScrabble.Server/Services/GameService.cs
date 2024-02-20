using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Repositories;
using MatrixScrabble.Server.Models.context;
using System.Text.Json;
using MongoDB.Driver.Core.Clusters.ServerSelectors;
using System.Linq;
using System.Drawing;
using System.Reflection;

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

		int length = existingGame.Word.Length ;

		int counter = 0;
		
		while (counter < length)
		{
			wordList.Add(String.Concat(gameDto.Game.Left[counter], existingGame.Word[counter], gameDto.Game.Board[counter], existingGame.Word[existingGame.Word.Length - counter], gameDto.Game.Right[counter]));
			counter++;
		}

		if (wordList.Contains(existingGame.Word))
		{
			throw new SameWordUsedException();
		}

		if (existingGame is null)
            throw new ResourceNotFoundException();

        existingGame.IsCompleted = true;
		existingGame.Game1 = JsonSerializer.Serialize(gameDto.Game);
		
		var updatedGame = await gameRepository.UpdateAsync(existingGame);

        return gameMapper.Map(updatedGame);
    }

    async Task<GameDetailsDto> IGameService.UpdateAsync(Guid id, GameDto gameDto)
    {
        if (gameDto is null)
            throw new ArgumentNullException(nameof(gameDto));

        var existingGame = await gameRepository.GetAsync(id);
		var language = existingGame.Language;

        if (existingGame is null)
            throw new ResourceNotFoundException();

		List<string> wordList = new List<string>();

		int length = existingGame.Word.Length;

		int counter = 0;

		while (counter < length)
		{
			var center = "";

			foreach(var itm in gameDto.Game.Board[counter])
			{
				center += itm;
			}

			wordList.Add(String.Concat(gameDto.Game.Left[counter], existingGame.Word[counter], center, existingGame.Word[existingGame.Word.Length - 1 - counter], gameDto.Game.Right[counter]));
			counter++;
		}

		List<bool> confirmations = new List<bool>();
		List<int> points = new List<int>();

		int looper = 0;

		foreach (var item in wordList)
		{
			var left = gameDto?.Game?.Left[looper];
			var right = gameDto?.Game?.Right[looper];
			string word = string.Concat(existingGame.Word[looper], string.Join("", gameDto.Game.Board[looper]), existingGame.Word[existingGame.Word.Length - 1 - looper]);

			if (item.Length > 2)
			{
				if (DictionaryService.WordExists(item, language)) confirmations.Add(true);
				else confirmations.Add(false);

				if (left.Length== 0 && right.Length == 0 && item.Length == length)
				{
					points.Add(0);
				}
				else
				{
					points.Add(((length - word.Length) + left.Length + right.Length) * -1);
				}
			}
			else
			{
				if (word == item)
				{
					confirmations.Add(true);
					points.Add(length - 2);
				}
				else
				{
					if (DictionaryService.WordExists(item, language)) confirmations.Add(true);
					else confirmations.Add(false);

					points.Add(((length - word.Length) + left.Length + right.Length) * -1);

				}
			}
		}

		var updatedGame = await gameRepository.UpdateAsync(existingGame);
		GameDetailsDto gameDetailsDto = new GameDetailsDto();

		gameDetailsDto.Game = gameMapper.Map(updatedGame);
		gameDetailsDto.Details = new Details();
		gameDetailsDto.Details.Confirmations = confirmations;
		gameDetailsDto.Details.Points = points;

		return gameDetailsDto;
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
