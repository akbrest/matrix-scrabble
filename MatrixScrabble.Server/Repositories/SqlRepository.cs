using MatrixScrabble.Server.Models.Сontext;
using Microsoft.EntityFrameworkCore;

namespace MatrixScrabble.Server.Repositories;

public class SqlRepository<T> : ISqlRepository<T>
   where T : class
{
	private readonly ScrabbleContext _context;

	public SqlRepository(ScrabbleContext context)
	{
		if (context is null)
			throw new ArgumentNullException(nameof(context));

		_context = context;
	}

	public async Task<T?> GetAsync(Guid id, Guid userId)
	{
		return await _context.Set<T>().FindAsync(id);
	}

	public async Task<IEnumerable<T>> GetAllAsync(Guid userId)
	{
		return await _context.Set<T>().ToListAsync();
	}

	public async Task<T> CreateAsync(T entity)
	{
		if (entity is null)
			throw new ArgumentNullException(nameof(entity));

		await _context.Set<T>().AddAsync(entity);
		await _context.SaveChangesAsync();
		return entity;
	}

	public async Task<T> UpdateAsync(T objModel)
	{
		_context.Entry(objModel).State = EntityState.Modified;
		await _context.SaveChangesAsync();

		return objModel;
	}

	public Task DeleteAsync(T objModel)
	{
		_context.Set<T>().Remove(objModel);
		return _context.SaveChangesAsync();
	}
}
