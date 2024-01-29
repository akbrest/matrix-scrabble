using MatrixScrabble.Server.DataLayer.Entities;
using MatrixScrabble.Server.Exceptions;
using MatrixScrabble.Server.Mappers;
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Repositories;

namespace MatrixScrabble.Server.Services
{
    public class GameService : IGameService
    {
        private readonly IRepository<Game> gameRepository;
        private readonly IGameMapper gameMapper;

        public GameService(IRepository<Game> gameRepository,
            IGameMapper gameMapper)
        {
            this.gameRepository = gameRepository
                ?? throw new ArgumentNullException(nameof(gameRepository));
            this.gameMapper = gameMapper
                ?? throw new ArgumentNullException(nameof(gameMapper));
        }

        async Task<IEnumerable<GameDto>> IGameService.GetAsync()
        {
            var games = await gameRepository.GetAllAsync();

            return games.Select(gameMapper.Map);
        }

        async Task<GameDto?> IGameService.GetAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

            var game = await gameRepository.GetAsync(id);

            if (game is null)
                throw new ResourceNotFoundException();

            return gameMapper.Map(game);
        }

        async Task<GameDto> IGameService.CreateAsync(GameDto gameDto)
        {
            if (gameDto is null)
                throw new ArgumentNullException(nameof(gameDto));

            var game = gameMapper.Map(gameDto);

            // TODO use Factory
            game.CreatedAt = DateTime.UtcNow;
            game.IsCompleted = false;

            var createdGame = await gameRepository.CreateAsync(game);

            return gameMapper.Map(createdGame);
        }

        async Task<GameDto> IGameService.UpdateAsync(string id, GameDto gameDto)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));
            if (gameDto is null)
                throw new ArgumentNullException(nameof(gameDto));

            var existingGame = await gameRepository.GetAsync(id);

            if (existingGame is null)
                throw new ResourceNotFoundException();

            existingGame.Word = gameDto.Word;

            var updatedGame = await gameRepository.UpdateAsync(existingGame);

            return gameMapper.Map(updatedGame);
        }

        async Task IGameService.RemoveAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

            var existingGame = await gameRepository.GetAsync(id);

            if (existingGame is null)
                throw new ResourceNotFoundException();

            await gameRepository.DeleteAsync(id);
        }
    }
}
