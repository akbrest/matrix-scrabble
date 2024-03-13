﻿using MatrixScrabble.Server.Models;

namespace MatrixScrabble.Server.Dtos;

public class GameDto
{
	public Guid? Id { get; set; }
	public required string Word { get; set; }
	public required string Language { get; set; }
	public bool IsCompleted { get; set; }
	public DateTime? CreatedAt { get; set; }
	public Board? Board { get; set; }
}
