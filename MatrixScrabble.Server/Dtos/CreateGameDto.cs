namespace MatrixScrabble.Server.Dtos;

public class CreateGameDto
{
    public required string Word { get; set; }
    public required string Language { get; set; }
	public Boolean Random { get; set; }
	public int Length { get; set; }
    public DateTime? CreatedAt { get; set; }
}
