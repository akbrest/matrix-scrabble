using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Models.context;

namespace MatrixScrabble.Server.Mappers;

public interface IGameMapper
{
    GameDto Map(Game game);
    Game Map(GameDto gameDto);
	Game Map(CreateGameDto gameDto);
}