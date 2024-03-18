using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Factories;

public interface IGameBoardFactory
{
	Dictionary<int, AnswerWordDto> CreateEmptyGameBoard(int wordLength);
}
