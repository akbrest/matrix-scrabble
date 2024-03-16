using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Repositories;
using MatrixScrabble.Server.Models.context;
using System.Text.Json;
using MatrixScrabble.Server.Models;

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

	async Task<IEnumerable<GameDto>> IGameService.GetAllAsync(Guid userId)
	{
		var games = await gameRepository.GetAllAsync(userId);

		return games.Select(gameMapper.Map);
	}

	async Task<GameDto?> IGameService.GetAsync(Guid id, Guid userId)
	{
		var game = await gameRepository.GetAsync(id, userId) ?? throw new ResourceNotFoundException(nameof(Game), id);

		var mapped = gameMapper.Map(game);

		if (game.Board != null)
			mapped.Board = JsonSerializer.Deserialize<Board>(game.Board);

		return mapped;
	}

	async Task<GameDto> IGameService.CreateAsync(CreateGameDto createGameDto, Guid userId)
	{
		if (createGameDto is null)
			throw new ArgumentNullException(nameof(createGameDto));

		var game = gameMapper.Map(createGameDto);

		if (createGameDto.Random)
			game.Word = DictionaryService.SelectRandomWord(createGameDto.Language, createGameDto.Length);

		var createdGame = await gameRepository.CreateAsync(game);

		return gameMapper.Map(createdGame);
	}

	async Task<GameDto> IGameService.ConfirmGame(GameDto gameDto, Guid userId)
	{
		if (gameDto is null)
			throw new ArgumentNullException(nameof(gameDto));

		var existingGame = await gameRepository.GetAsync(gameDto.Id, userId) ?? throw new ResourceNotFoundException(nameof(Game), gameDto.Id);

		var wordList = new List<string>();
		int length = existingGame.Word.Length;
		int counter = 0;

		while (counter < length)
		{
			wordList.Add(string.Concat(gameDto.Board?.Left[counter], existingGame.Word[counter], gameDto.Board?.Center[counter], existingGame.Word[existingGame.Word.Length - counter], gameDto.Board?.Right[counter]));
			counter++;
		}

		if (wordList.Contains(existingGame.Word))
		{
			throw new SameWordUsedException();
		}

		existingGame.IsCompleted = true;
		existingGame.Board = JsonSerializer.Serialize(gameDto.Board);

		var updatedGame = await gameRepository.UpdateAsync(existingGame);

		return gameMapper.Map(updatedGame);
	}

	async Task<GameDetailsDto> IGameService.UpdateAsync(Guid id, GameDto gameDto, Guid userId)
	{
		if (gameDto is null)
			throw new ArgumentNullException(nameof(gameDto));

		var existingGame = await gameRepository.GetAsync(id, userId) ?? throw new ResourceNotFoundException(nameof(Game), id);

		var language = existingGame.Language;
		var wordList = new List<string>();
		int length = existingGame.Word.Length;
		int counter = 0;

		while (counter < length)
		{
			var center = "";

			foreach (var itm in gameDto.Board.Center[counter])
			{
				center += itm;
			}

			wordList.Add(string.Concat(gameDto.Board.Left[counter], existingGame.Word[counter], center, existingGame.Word[existingGame.Word.Length - 1 - counter], gameDto.Board.Right[counter]));
			counter++;
		}

		var confirmations = new List<bool>();
		var points = new List<int>();
		int looper = 0;

		foreach (var item in wordList)
		{
			var left = gameDto?.Board?.Left[looper];
			var right = gameDto?.Board?.Right[looper];
			string word = string.Concat(existingGame.Word[looper], string.Join("", gameDto.Board.Center[looper]), existingGame.Word[existingGame.Word.Length - 1 - looper]);

			if (item.Length >= 2)
			{
				if (DictionaryService.WordExists(item, language)) confirmations.Add(true);
				else confirmations.Add(false);

				if (left.Length == 0 && right.Length == 0 && item.Length == length)
				{
					points.Add(0);
				}
				else
				{
					points.Add((length - word.Length + left.Length + right.Length) * -1);
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

					points.Add((length - word.Length + left.Length + right.Length) * -1);

				}
			}
		}

		existingGame.Board = JsonSerializer.Serialize(gameDto.Board);

		var updatedGame = await gameRepository.UpdateAsync(existingGame);
		var gameDetailsDto = new GameDetailsDto
		{
			Game = gameMapper.Map(updatedGame)
		};

		gameDetailsDto.Game.Board = gameDto.Board;
		gameDetailsDto.Details = new Details
		{
			Confirmations = confirmations,
			Points = points
		};
		gameDetailsDto.Game.Language = string.Empty;
		gameDetailsDto.Game.Word = string.Empty;

		return gameDetailsDto;
	}

	async Task IGameService.RemoveAsync(Guid id, Guid userId)
	{
		if (string.IsNullOrWhiteSpace(id.ToString()))
			throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

		var existingGame = await gameRepository.GetAsync(id, userId) ?? throw new ResourceNotFoundException(nameof(Game), id);

		await gameRepository.DeleteAsync(existingGame);
	}
}
