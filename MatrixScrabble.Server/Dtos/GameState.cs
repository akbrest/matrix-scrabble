using MatrixScrabble.Server.Models;

namespace MatrixScrabble.Server.Dtos;

public class GameState
{
    public string? Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public Game Game { get; set; }
}