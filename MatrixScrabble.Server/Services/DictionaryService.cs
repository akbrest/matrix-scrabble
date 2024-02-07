namespace MatrixScrabble.Server.Services;

public class DictionaryService : IDictionaryService
{

    private static List<String> _items;

    private String _basePath;

    public DictionaryService(IWebHostEnvironment _webHostEnvironment)
    {
        _basePath = _webHostEnvironment.ContentRootPath;
    }

    public async Task<IList<string>> GetAllAsync()
    {
        if (_items != null)
            return _items;

        _items = new List<string>();

        using (var streamReader = File.OpenText($"{_basePath}\\Dictionary\\dictionary.txt"))
        {
            var lines = streamReader.ReadToEnd().Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
            foreach (var line in lines)
            {
                _items.Add(line.Trim());
            }        
        }    

        return _items;
    }
}