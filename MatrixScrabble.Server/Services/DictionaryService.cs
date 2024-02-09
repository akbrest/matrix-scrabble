namespace MatrixScrabble.Server.Services;
    
public static class DictionaryService 
{
	           
    private static List<String> _items;

    static DictionaryService()
    {
		//_basePath = _webHostEnvironment.ContentRootPath;
		GetAllAsync();
    }

    public static IList<string> GetAllAsync()
    {

		var _basePath = "";

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