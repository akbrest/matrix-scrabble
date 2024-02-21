namespace MatrixScrabble.Server.Dtos;

public class Details
{
	public List<bool> Confirmations { get; set; } = new List<bool>();

	public List<int> Points { get; set; } = new List<int>();

}

public class GameDetailsDto
{
    public GameDto Game { get; set; } 

	public Details Details { get; set; }
}