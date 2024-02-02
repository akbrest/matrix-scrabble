using MatrixScrabble.Server.DataLayer;
using MatrixScrabble.Server.DataLayer.Entities;
using MongoDB.Driver;

namespace MatrixScrabble.Server.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
       where TEntity : BaseEntity
    {
        private readonly IMongoCollection<TEntity> collection;

        public Repository(IDbContext context)
        {
            if (context is null)
                throw new ArgumentNullException(nameof(context));

            collection = context.Database.GetCollection<TEntity>($"{typeof(TEntity).Name}Collection");
        }

        async Task<IEnumerable<TEntity>> IRepository<TEntity>.GetAllAsync()
        {
            return await collection.Find(_ => true).ToListAsync();
        }

        async Task<TEntity> IRepository<TEntity>.GetAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

            return await collection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        async Task<TEntity> IRepository<TEntity>.CreateAsync(TEntity entity)
        {
            if (entity is null)
                throw new ArgumentNullException(nameof(entity));

            await collection.InsertOneAsync(entity);

            return entity;
        }

        async Task<TEntity> IRepository<TEntity>.UpdateAsync(TEntity entity)
        {
            if (entity is null)
                throw new ArgumentNullException(nameof(entity));

            await collection.FindOneAndReplaceAsync(
                filter: g => g.Id == entity.Id,
                replacement: entity);

            return entity;
        }

        async Task IRepository<TEntity>.DeleteAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException($"'{nameof(id)}' cannot be null or whitespace.", nameof(id));

            await collection.DeleteOneAsync(x => x.Id == id);
        }
    }
}
