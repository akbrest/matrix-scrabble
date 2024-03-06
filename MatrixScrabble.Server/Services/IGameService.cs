using MatrixScrabble.Server.Dtos;

namespace MatrixScrabble.Server.Services;

public interface IGameService
{
    Task<IEnumerable<GameDto>> GetAllAsync(Guid userId);
    Task<GameDto?> GetAsync(Guid id, Guid userId);
    Task<GameDto> CreateAsync(GameDto game, Guid userId);
    Task<GameDetailsDto> UpdateAsync(Guid id, GameDto game, Guid userId);
    Task<GameDto> ConfirmGame(GameDto gameDto, Guid userId);
    Task RemoveAsync(Guid id, Guid userId);
}