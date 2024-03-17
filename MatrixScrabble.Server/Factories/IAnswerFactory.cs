using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Factories;

public interface IAnswerFactory
{
	string Create(AnswerWordDto answerWordDto, int wordOrderId, string gameWord);
}
