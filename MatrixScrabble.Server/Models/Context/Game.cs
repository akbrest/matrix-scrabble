using System;
using System.Collections.Generic;

namespace MatrixScrabble.Server.Models.context;

public partial class Game
{
    public long? Id { get; set; }

    public string? Language { get; set; }

    public string? Game1 { get; set; }

    public bool? IsCompleted { get; set; }

    public string? Word { get; set; }

    public DateTime? DateCreated { get; set; }
}
