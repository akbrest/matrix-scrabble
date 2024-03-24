using MatrixScrabble.Server.Dtos.Enums;

namespace MatrixScrabble.Server.Helpers;

public interface IDictionaryHelper
{
	bool IsWordExists(string word, LanguageDto language);
	string GetRandomWord(LanguageDto language, int length);
	int GetSamePatternWordCount(LanguageDto language, string word);
}
