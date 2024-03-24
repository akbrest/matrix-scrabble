using MatrixScrabble.Server.Dtos.Enums;
using System.Text.RegularExpressions;
using System.Linq;

namespace MatrixScrabble.Server.Helpers;

public class DictionaryHelper : IDictionaryHelper
{
    private readonly List<string> _itemsRu;
    private readonly List<string> _itemsEn;

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

    public int GetSamePatternWordCount(LanguageDto language, string word)
    {
        if (word == null || word.Length < Constants.Game.MinimumWordLength || word.Length > _maximumRandomWordLength)
            throw new Exception(Constants.ErrorMessage.LengthIsNotCorrect);

        List<string> words = new List<string>();

        if (language == LanguageDto.Ru)
            words = _itemsRu.Where(t => t.Length == word.Length).ToList();
        else
            words = _itemsEn.Where(t => t.Length == word.Length).ToList();

        int count = 0;

        foreach (var item in words)
        {
            if (item[0] == word[0] && item[word.Length - 1] == word[word.Length - 1])
            {
                count++;
            }
        }

        return count;

    }

    public string GetRandomWord(LanguageDto language, int length)
    {
        if (length < Constants.Game.MinimumWordLength || length > _maximumRandomWordLength)
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
        var dictionary = new List<string>();

        foreach (var line in lines)
            dictionary.Add(line.Trim());

        return dictionary;
    }

    private static List<string> GetEnglishDictionary()
    {
        using var streamReader = File.OpenText($"{Environment.CurrentDirectory}\\Dictionary\\dictionary.en.txt");
        var lines = streamReader.ReadToEnd().Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
        var dictionary = new List<string>();

        foreach (var line in lines)
            dictionary.Add(line.Trim());

        return dictionary;
    }
}