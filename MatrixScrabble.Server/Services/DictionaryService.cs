namespace MatrixScrabble.Server.Services;

public static class DictionaryService
{
	private static List<string> _itemsRu;
	private static List<string> _itemsEn;
	private static string _basePath;
	
	private const int MAXIMUM_WORD_LENGTH = 7;
	private const int MINIMUM_WORD_LENGTH = 3;
		
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

		}
		else
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

	public static string SelectRandomWord(string language, int length)
	{
		if (length < MINIMUM_WORD_LENGTH || length > MAXIMUM_WORD_LENGTH)
		{
			throw new Exception("Length is not correct");
		}
		else
		{
			List<string> words = new List<string>();

			if (language == "ru")
				words = _itemsRu.Where(t => t.Length == length).ToList();
			else
				words = _itemsEn.Where(t => t.Length == length).ToList();

			var random = new Random();
			int index = random.Next(words.Count);
			return words[index];
		}
	}
}