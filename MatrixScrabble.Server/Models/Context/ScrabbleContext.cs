using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MatrixScrabble.Server.Models.context;

public partial class ScrabbleContext : DbContext
{
    public ScrabbleContext()
    {
    }

    public ScrabbleContext(DbContextOptions<ScrabbleContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Game> Games { get; set; }

    public virtual DbSet<GameHistory> GameHistories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=LT-NB-334\\SQLEXPRESS;Initial Catalog=Scrabble;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Game>(entity =>
        {
            entity.ToTable("Game");
			entity.HasKey(entity => entity.Id);
            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newsequentialid())")
                .HasColumnName("id");
            entity.Property(e => e.DateCreated)
                .HasColumnType("datetime")
                .HasColumnName("date_created");
            entity.Property(e => e.Game1).HasColumnName("game");
            entity.Property(e => e.IsCompleted).HasColumnName("is_completed");
            entity.Property(e => e.Language).HasColumnName("language");
            entity.Property(e => e.Word)
                .HasMaxLength(50)
                .HasColumnName("word");
        });

        modelBuilder.Entity<GameHistory>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GameHistory");

            entity.Property(e => e.DateCreated)
                .HasColumnType("datetime")
                .HasColumnName("date_created");
            entity.Property(e => e.Game).HasColumnName("game");
            entity.Property(e => e.GameId).HasColumnName("game_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
