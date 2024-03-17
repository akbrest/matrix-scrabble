namespace MatrixScrabble.Server.Models.Сontext;

public partial class Game
{
	public Guid Id { get; set; }
	public required string Word { get; set; }
	public required string Language { get; set; }
	public bool IsCompleted { get; set; }
	public DateTime DateCreated { get; set; }
	public string? Board { get; set; }
}
