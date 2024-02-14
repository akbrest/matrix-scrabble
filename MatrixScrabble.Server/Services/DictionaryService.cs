namespace MatrixScrabble.Server.Services;
    
public static class DictionaryService 
{

	private static List<string> _items;
	private static string _basePath;

	static DictionaryService()
    {
		_basePath = System.Environment.CurrentDirectory;
		GetAllAsync();
    }

    private static IList<string> GetAllAsync()
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

	public static bool WordExists(string word)
	{
		if (_items.Contains(word))
		{
			return true;
		}

		return false;
	}
}