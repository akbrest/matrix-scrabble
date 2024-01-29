namespace MatrixScrabble.Server.Dtos
{
    public class GameDto
    {
        public string? Id { get; set; }
        public required string Word { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
