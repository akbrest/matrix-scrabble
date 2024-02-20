using MatrixScrabble.Server.Models;

namespace MatrixScrabble.Server.Dtos;

public class Details
{
	public List<bool> Confirmations { get; set; }

	public List<int> Points { get; set; }

}

public class GameDetailsDto
{
    public GameDto Game { get; set; }

	public Details Details { get; set; }
   
}