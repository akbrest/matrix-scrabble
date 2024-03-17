using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Factories;

public class AnswerFactory : IAnswerFactory
{
	public string Create(AnswerWordDto answerWordDto, int wordOrderId, string gameWord)
	{
		if (answerWordDto is null)
			throw new ArgumentNullException(nameof(answerWordDto));
		if (wordOrderId < Constants.Game.GameBoardIndexStartsFrom)
			throw new ArgumentOutOfRangeException(nameof(wordOrderId));
		if (string.IsNullOrWhiteSpace(gameWord))
			throw new ArgumentException($"'{nameof(gameWord)}' cannot be null or whitespace.", nameof(gameWord));
		
		var gameWordArray = gameWord.ToCharArray();
		var reverseGameWordArray = gameWord.Reverse().ToArray();
		var index = wordOrderId - Constants.Game.GameBoardIndexStartsFrom;
		var answer = answerWordDto.Left + gameWordArray[index] + answerWordDto.Center + reverseGameWordArray[index] + answerWordDto.Right;

		return answer;
	}
}
