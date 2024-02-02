namespace MatrixScrabble.Server.DataLayer.Entities
{
    public class Game : BaseEntity
    {
        public required string Word { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
