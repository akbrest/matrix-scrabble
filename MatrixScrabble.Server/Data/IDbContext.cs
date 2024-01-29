using MongoDB.Driver;

namespace MatrixScrabble.Server.DataLayer
{
    public interface IDbContext
    {
        IMongoDatabase Database { get; }
    }
}
