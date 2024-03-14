namespace MatrixScrabble.Server.Dtos;

public class CheckWordAllowanceDto
{
	public required string Word { get; set; }
	public required string Language { get; set; }
}
