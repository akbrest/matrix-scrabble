using MatrixScrabble.Server.Dtos.Enums;

namespace MatrixScrabble.Server.Dtos;

public class CheckWordAllowanceDto
{
	public required string Word { get; set; }
	public required LanguageDto Language { get; set; }
}
