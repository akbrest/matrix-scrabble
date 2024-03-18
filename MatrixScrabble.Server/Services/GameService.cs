using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Repositories;
using MatrixScrabble.Server.Models.Сontext;
using System.Text.Json;
using MatrixScrabble.Server.Helpers;
using MatrixScrabble.Server.Factories;

namespace MatrixScrabble.Server.Services;

public class GameService : IGameService
{
	private readonly ISqlRepository<Game> _gameRepository;
	private readonly IGameMapper _gameMapper;
	private readonly IDictionaryHelper _dictionaryHelper;
	private readonly IGameBoardFactory _gameBoardFactory;
	private readonly IJsonSerializerHelper _jsonSerializerHelper;

	public GameService(ISqlRepository<Game> gameRepository, IGameMapper gameMapper, IDictionaryHelper dictionaryHelper,
		IGameBoardFactory gameBoardFactory, IJsonSerializerHelper jsonSerializerHelper)
	{
		_gameRepository = gameRepository
			?? throw new ArgumentNullException(nameof(gameRepository));
		_gameMapper = gameMapper
			?? throw new ArgumentNullException(nameof(gameMapper));
		_dictionaryHelper = dictionaryHelper
			?? throw new ArgumentNullException(nameof(dictionaryHelper));
		_gameBoardFactory = gameBoardFactory
			?? throw new ArgumentNullException(nameof(gameBoardFactory));
		_jsonSerializerHelper = jsonSerializerHelper
			?? throw new ArgumentNullException(nameof(jsonSerializerHelper));
	}

	public async Task<IEnumerable<GameDto>> GetAllAsync(Guid userId)
	{
		var games = await _gameRepository.GetAllAsync(userId);

		return games.Select(_gameMapper.Map);
	}

	public async Task<GameDto?> GetAsync(Guid id, Guid userId)
	{
		var game = await _gameRepository.GetAsync(id, userId) ?? throw new ResourceNotFoundException(nameof(Game), id);

		var mapped = _gameMapper.Map(game);

		if (game.Board == null)
			return mapped;

		if (_jsonSerializerHelper.TryDeserialize<BoardDto>(game.Board, out var boardDto))
			mapped.Board = boardDto;
		else if (_jsonSerializerHelper.TryDeserialize<Dictionary<int, AnswerWordDto>>(game.Board, out var gameBoardDto))
			mapped.GameBoard = gameBoardDto;

		return mapped;
	}

	public async Task<GameDto> CreateAsync(CreateGameDto createGameDto, Guid userId)
	{
		if (createGameDto is null)
			throw new ArgumentNullException(nameof(createGameDto));

		if (createGameDto.Random)
			createGameDto.Word = _dictionaryHelper.GetRandomWord(createGameDto.Language, createGameDto.Length);

		var gameBoard = _gameBoardFactory.CreateEmptyGameBoard(createGameDto.Word.Length);

		var game = _gameMapper.Map(createGameDto);
		game.Board = JsonSerializer.Serialize(gameBoard);

		var createdGame = await _gameRepository.CreateAsync(game);

		var gameDto = _gameMapper.Map(createdGame);
		gameDto.GameBoard = gameBoard;

		return gameDto;
	}

	public async Task<GameDto> ConfirmGame(GameDto gameDto, Guid userId)
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
				throw new SameWordUsedException();
		}

		existingGame.IsCompleted = true;
		existingGame.Board = JsonSerializer.Serialize(gameDto.Board);

		var updatedGame = await _gameRepository.UpdateAsync(existingGame);

		return _gameMapper.Map(updatedGame);
	}

	public async Task<GameDetailsDto> UpdateAsync(Guid id, GameDto gameDto, Guid userId)
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
				center += itm;

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
					points.Add(0);
				else
					points.Add((length - word.Length + left.Length + right.Length) * -1);
			}
			else if (word == item)
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

	public async Task RemoveAsync(Guid id, Guid userId)
	{
		if (string.IsNullOrWhiteSpace(id.ToString()))
			throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

		var existingGame = await _gameRepository.GetAsync(id, userId) ?? throw new ResourceNotFoundException(nameof(Game), id);

		await _gameRepository.DeleteAsync(existingGame);
	}
}
