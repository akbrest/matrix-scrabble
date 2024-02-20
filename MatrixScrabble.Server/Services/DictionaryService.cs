using Microsoft.AspNetCore.Razor.Hosting;

namespace MatrixScrabble.Server.Services;
    
public static class DictionaryService 
{
	private static List<string> _itemsRu;
	private static List<string> _itemsEn;
	private static string _basePath;

	static DictionaryService()
    {
		_basePath = System.Environment.CurrentDirectory;
		GetAllAsync();
    }

    private static void GetAllAsync()
    {
		if (_itemsRu == null)
		{
			_itemsRu = new List<string>();
			using (var streamReader = File.OpenText($"{_basePath}\\Dictionary\\dictionary.ru.txt"))
			{
				var lines = streamReader.ReadToEnd().Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
				foreach (var line in lines)
				{
					_itemsRu.Add(line.Trim());
				}
			}
		}

		if (_itemsEn == null)
		{
			_itemsEn = new List<string>();

			using (var streamReader = File.OpenText($"{_basePath}\\Dictionary\\dictionary.en.txt"))
			{
				var lines = streamReader.ReadToEnd().Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
				foreach (var line in lines)
				{
					_itemsEn.Add(line.Trim());
				}
			}
		}
	}

	public static bool WordExists(string word, string language)
	{
		if (language == "ru" || language == "en")
		{
			throw new Exception("NO LANGUAGE");
		}
		
		if (language == "ru")
		{
			if (_itemsRu.Contains(word))
			{
				return true;
			}
		}

		if (language == "en")
		{
			if (_itemsEn.Contains(word))
			{
				return true;
			}
		}

		return false;
	}
}