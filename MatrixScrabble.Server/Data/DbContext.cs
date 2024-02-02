using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MatrixScrabble.Server.DataLayer
{
    public class DbContext : IDbContext
    {
        public DbContext(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);
            Database = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
        }

        public IMongoDatabase Database { get; }
    }
}
