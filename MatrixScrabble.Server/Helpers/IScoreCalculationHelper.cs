using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Helpers;

public interface IScoreCalculationHelper
{
    int Calcucate(AnswerWordDto answerWord);
}
