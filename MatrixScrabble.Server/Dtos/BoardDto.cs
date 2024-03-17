namespace MatrixScrabble.Server.Dtos;

public class BoardDto
{
	public List<string> Left { get; set; }
	public List<List<string>> Center { get; set; }
	public List<string> Right { get; set; }
}
