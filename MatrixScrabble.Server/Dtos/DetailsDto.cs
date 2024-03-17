namespace MatrixScrabble.Server.Dtos;

public class DetailsDto
{
	public List<bool> Confirmations { get; set; } = new List<bool>();
	public List<int> Points { get; set; } = new List<int>();
}
