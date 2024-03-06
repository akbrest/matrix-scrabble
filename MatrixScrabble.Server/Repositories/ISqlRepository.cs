namespace MatrixScrabble.Server.Repositories;

public interface ISqlRepository<T>
{
	Task<IEnumerable<T>> GetAllAsync(Guid userId);
	Task<T> GetAsync(Guid id, Guid userId);
	Task<T> CreateAsync(T entity);
	Task<T> UpdateAsync(T entity);
	Task DeleteAsync(T entity);
}