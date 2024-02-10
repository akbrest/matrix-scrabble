namespace MatrixScrabble.Server.Models;

public class Game
{
    public String ID { get; set; }
    public List<string> Left{ get; set; }
    public List<List<string>> Board { get; set; }
    public List<string> Right { get; set; }
}
