namespace MatrixScrabble.Server.Models;

public class Game
{
    public Guid ID { get; set; }
    public List<List<string>> Board{ get; set; }
}
