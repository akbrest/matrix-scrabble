using MatrixScrabble.Server.Dtos.Enums;

namespace MatrixScrabble.Server.Dtos;

public class CreateGameDto
{
	public required string Word { get; set; }
	public required LanguageDto Language { get; set; }
	public bool Random { get; set; }
	public int Length { get; set; }
}
