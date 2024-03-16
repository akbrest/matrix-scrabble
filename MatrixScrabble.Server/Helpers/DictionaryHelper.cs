using MatrixScrabble.Server.Dtos.Enums;

namespace MatrixScrabble.Server.Helpers;

public class DictionaryHelper : IDictionaryHelper
{
	private readonly List<string> _itemsRu;
	private readonly List<string> _itemsEn;

	private const int _minimumRandomWordLength = 3;
	private const int _maximumRandomWordLength = 7;

	public DictionaryHelper()
	{
		_itemsRu = GetRussianDictionary();
		_itemsEn = GetEnglishDictionary();
	}

	public bool IsWordExists(string word, LanguageDto language)
	{
		if (language == LanguageDto.Ru && _itemsRu.Contains(word))
			return true;
		
		if (language == LanguageDto.En && _itemsEn.Contains(word))
			return true;

		return false;
	}

	public string GetRandomWord(LanguageDto language, int length)
	{
		if (length < _minimumRandomWordLength || length > _maximumRandomWordLength)
			throw new Exception(Constants.ErrorMessage.LengthIsNotCorrect);

		var words = new List<string>();

		if (language == LanguageDto.Ru)
			words = _itemsRu.Where(t => t.Length == length).ToList();
		else
			words = _itemsEn.Where(t => t.Length == length).ToList();

		var random = new Random();
		var index = random.Next(words.Count);

		return words[index];
	}

	private static List<string> GetRussianDictionary()
	{
		using var streamReader = File.OpenText($"{Environment.CurrentDirectory}\\Dictionary\\dictionary.ru.txt");
		var lines = streamReader.ReadToEnd().Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
		var dictionaty = new List<string>();

		foreach (var line in lines)
			dictionaty.Add(line.Trim());
		
		return dictionaty;
	}

	private static List<string> GetEnglishDictionary()
	{
		using var streamReader = File.OpenText($"{Environment.CurrentDirectory}\\Dictionary\\dictionary.en.txt");
		var lines = streamReader.ReadToEnd().Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
		var dictionaty = new List<string>();

		foreach (var line in lines)
			dictionaty.Add(line.Trim());

		return dictionaty;
	}
}