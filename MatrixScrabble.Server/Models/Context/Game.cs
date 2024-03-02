﻿namespace MatrixScrabble.Server.Models.context;

public partial class Game
{
	public Guid Id { get; set; }
	public required string Word { get; set; }
	public required string Language { get; set; }
	public bool IsCompleted { get; set; }
	public DateTime DateCreated { get; set; }
	public string? Game1 { get; set; }
}
