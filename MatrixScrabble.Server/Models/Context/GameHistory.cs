using System;
using System.Collections.Generic;

namespace MatrixScrabble.Server.Models.context;

public partial class GameHistory
{
    public string? Game { get; set; }

    public DateTime? DateCreated { get; set; }

    public Guid? GameId { get; set; }
}
