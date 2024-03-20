using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Factories;

public class GameBoardFactory : IGameBoardFactory
{
	public Dictionary<int, AnswerWordDto> CreateEmptyGameBoard(int wordLength)
	{
		if (wordLength < Constants.Game.MinimumWordLength)
			throw new ArgumentOutOfRangeException(nameof(wordLength));

		var gameBoard = new Dictionary<int, AnswerWordDto>();

		for (int i = Constants.Game.GameBoardIndexStartsFrom; i <= wordLength; i++)
			gameBoard.Add(i, new AnswerWordDto(string.Empty, string.Empty, string.Empty));

		return gameBoard;
	}
}
