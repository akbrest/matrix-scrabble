using MatrixScrabble.Server.Dtos.Enums;

namespace MatrixScrabble.Server.Dtos;

public class GameDto
{
	public Guid Id { get; set; }
	public required string Word { get; set; }
	public required LanguageDto Language { get; set; }
	public bool IsCompleted { get; set; }
	public DateTime? CreatedAt { get; set; }
	public BoardDto? Board { get; set; }
}
