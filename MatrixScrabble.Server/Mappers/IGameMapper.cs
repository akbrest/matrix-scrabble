using MatrixScrabble.Server.DataLayer.Entities;
using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Mappers
{
    public interface IGameMapper
    {
        GameDto Map(Game game);
        Game Map(GameDto gameDto);
    }
}
