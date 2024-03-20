namespace MatrixScrabble.Server.Dtos;

public class AnswerWordDto
{
	public AnswerWordDto(string left, string center, string right)
	{
		Left = left;
		Center = center;
		Right = right;
	}

	public string Left { get; set; }
	public string Center { get; set; }
	public string Right { get; set; }
	public int Score { get; set; }
}
