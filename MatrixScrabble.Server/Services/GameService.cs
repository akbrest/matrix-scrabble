using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Repositories;
using MatrixScrabble.Server.Models.Сontext;
using System.Text.Json;
using MatrixScrabble.Server.Helpers;

namespace MatrixScrabble.Server.Services;

public class GameService : IGameService
{
	private readonly ISqlRepository<Game> _gameRepository;
	private readonly IGameMapper _gameMapper;
	private readonly IDictionaryHelper _dictionaryHelper;

	public GameService(ISqlRepository<Game> gameRepository, IGameMapper gameMapper, IDictionaryHelper dictionaryHelper)
	{
		_gameRepository = gameRepository
			?? throw new ArgumentNullException(nameof(gameRepository));
		_gameMapper = gameMapper
			?? throw new ArgumentNullException(nameof(gameMapper));
		_dictionaryHelper = dictionaryHelper
			?? throw new ArgumentNullException(nameof(dictionaryHelper));
	}

	async Task<IEnumerable<GameDto>> IGameService.GetAllAsync(Guid userId)
	{
		var games = await _gameRepository.GetAllAsync(userId);

		return games.Select(_gameMapper.Map);
	}

	async Task<GameDto?> IGameService.GetAsync(Guid id, Guid userId)
	{
		var game = await _gameRepository.GetAsync(id, userId) ?? throw new ResourceNotFoundException(nameof(Game), id);

		var mapped = _gameMapper.Map(game);

		if (game.Board != null && game.Board != "")
			mapped.Board = JsonSerializer.Deserialize<BoardDto>(game.Board);

		return mapped;
	}

	async Task<GameDto> IGameService.CreateAsync(CreateGameDto createGameDto, Guid userId)
	{
		if (createGameDto is null)
			throw new ArgumentNullException(nameof(createGameDto));

		var game = _gameMapper.Map(createGameDto);

		if (createGameDto.Random)
			game.Word = _dictionaryHelper.GetRandomWord(createGameDto.Language, createGameDto.Length);

		var createdGame = await _gameRepository.CreateAsync(game);

		return _gameMapper.Map(createdGame);
	}

	async Task<GameDto> IGameService.ConfirmGame(GameDto gameDto, Guid userId)
	{
		if (gameDto is null)
			throw new ArgumentNullException(nameof(gameDto));

		var existingGame = await _gameRepository.GetAsync(gameDto.Id, userId) ?? throw new ResourceNotFoundException(nameof(Game), gameDto.Id);

		if (existingGame.IsCompleted)
			throw new Exception(Constants.ErrorMessage.GameHasAlreadyConfirmed);

		if (gameDto.Board is not null)
		{
			var wordList = new List<string>();
			int length = existingGame.Word.Length;
			int counter = 0;

			while (counter < length)
			{
				wordList.Add(string.Concat(gameDto.Board.Left[counter], existingGame.Word[counter], gameDto.Board.Center[counter], existingGame.Word[existingGame.Word.Length - counter], gameDto.Board.Right[counter]));
				counter++;
			}

			if (wordList.Contains(existingGame.Word))
			{
				throw new SameWordUsedException();
			}
		}

		existingGame.IsCompleted = true;
		existingGame.Board = JsonSerializer.Serialize(gameDto.Board);

		var updatedGame = await _gameRepository.UpdateAsync(existingGame);

		return _gameMapper.Map(updatedGame);
	}

	async Task<GameDetailsDto> IGameService.UpdateAsync(Guid id, GameDto gameDto, Guid userId)
	{
		if (gameDto is null)
			throw new ArgumentNullException(nameof(gameDto));

		var existingGame = await _gameRepository.GetAsync(id, userId) ?? throw new ResourceNotFoundException(nameof(Game), id);

		var existingGameDto = _gameMapper.Map(existingGame);

		var length = existingGame.Word.Length;
		var counter = 0;
		var wordList = new List<string>();

		while (counter < length)
		{
			var center = "";

			foreach (var itm in gameDto.Board.Center[counter])
			{
				center += itm;
			}

			wordList.Add(string.Concat(gameDto.Board.Left[counter], existingGameDto.Word[counter], center, existingGameDto.Word[existingGameDto.Word.Length - 1 - counter], gameDto.Board.Right[counter]));
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
				if (_dictionaryHelper.IsWordExists(item, existingGameDto.Language))
					confirmations.Add(true);
				else
					confirmations.Add(false);

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
					if (_dictionaryHelper.IsWordExists(item, existingGameDto.Language))
						confirmations.Add(true);
					else
						confirmations.Add(false);

					points.Add((length - word.Length + left.Length + right.Length) * -1);

				}
			}
		}

		existingGame.Board = JsonSerializer.Serialize(gameDto.Board);

		var updatedGame = await _gameRepository.UpdateAsync(existingGame);
		var gameDetailsDto = new GameDetailsDto
		{
			Game = _gameMapper.Map(updatedGame)
		};

		gameDetailsDto.Game.Board = gameDto.Board;
		gameDetailsDto.Details = new DetailsDto
		{
			Confirmations = confirmations,
			Points = points
		};
		// For what?
		//gameDetailsDto.Game.Language = string.Empty;
		gameDetailsDto.Game.Word = string.Empty;

		return gameDetailsDto;
	}

	async Task IGameService.RemoveAsync(Guid id, Guid userId)
	{
		if (string.IsNullOrWhiteSpace(id.ToString()))
			throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

		var existingGame = await _gameRepository.GetAsync(id, userId) ?? throw new ResourceNotFoundException(nameof(Game), id);

		await _gameRepository.DeleteAsync(existingGame);
	}
}
