namespace MatrixScrabble.Server.Repositories;

public interface ISqlRepository<T>
{
	Task<IEnumerable<T>> GetAllAsync();
	Task<T> GetAsync(Guid id);
	Task<T> CreateAsync(T entity, Guid? user_id );
	Task<T> UpdateAsync(T entity);
	Task DeleteAsync(T entity);
}