using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Helpers;

public class ScoreCalculationHelper : IScoreCalculationHelper
{
    private const int _centerPoints = 2;
    private const int _leftRightPoints = -1;

    public int Calculate(AnswerWordDto answerWord)
    {
        if (answerWord is null)
            throw new ArgumentNullException(nameof(answerWord));

        var score = answerWord.Center.Length * _centerPoints + (answerWord.Left.Length + answerWord.Right.Length) * _leftRightPoints;

        return score;
    }
}
