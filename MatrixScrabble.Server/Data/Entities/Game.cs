namespace MatrixScrabble.Server.DataLayer.Entities
{
    public class Game 
    {
		public String ID { get; set; }
		public required string Word { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public Field Field { get; set; }
    }

    public class Field
    {
        public List<string> Left { get; set; }
        public List<List<string>> Main { get; set; }
        public List<string> Right { get; set; }
    }
}
