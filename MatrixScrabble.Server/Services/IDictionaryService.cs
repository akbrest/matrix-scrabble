public interface IDictionaryService
{
    Task<IList<string>> GetAllAsync();
}