using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Helpers;

public interface IScoreCalculationHelper
{
    int Calculate(AnswerWordDto answerWord);
}
