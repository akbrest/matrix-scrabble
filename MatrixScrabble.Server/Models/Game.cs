namespace MatrixScrabble.Server.Models;

public class Board
{
    public String ID { get; set; }
    public List<string> Left{ get; set; }
    public List<List<string>> Center { get; set; }
    public List<string> Right { get; set; }
}
