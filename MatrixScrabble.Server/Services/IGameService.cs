using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Services;

public interface IGameService
{
    Task<IEnumerable<GameDto>> GetAsync();
    Task<GameDto?> GetAsync(string id);
    Task<GameDto> CreateAsync(GameDto game);
    Task<GameDto> UpdateAsync(string id, GameDto game);
    Task<GameDto> ConfirmGame(GameDto gameDto);

    Task RemoveAsync(string id);
}