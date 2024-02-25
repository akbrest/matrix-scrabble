using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Services;

public interface IGameService
{
    Task<IEnumerable<GameDto>> GetAsync();
    Task<GameDto?> GetAsync(Guid id);
    Task<GameDto> CreateAsync(GameDto game);
    Task<GameDetailsDto> UpdateAsync(Guid id, GameDto game);
    Task<GameDto> ConfirmGame(GameDto gameDto);
    Task RemoveAsync(Guid id);
}