// See https://aka.ms/new-console-template for more information
using System.Linq;

Console.WriteLine("Hello, World!");

char[] digits = {
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
};

char[] letter = {
    'А',
    'а',
    'Б',
    'б',
    'В',
    'в',
    'Г',
    'г',
    'Д',
    'д',
    'Е',
    'е',
    'Ё',
    'ё',
    'Ж',
    'ж',
    'З',
    'з',
    'И',
    'и',
    'Й',
    'й',
    'К',
    'к',
    'Л',
    'л',
    'М',
    'м',
    'Н',
    'н',
    'О',
    'о',
    'П',
    'п',
    'Р',
    'р',
    'С',
    'с',
    'Т',
    'т',
    'У',
    'у',
    'Ф',
    'ф',
    'Х',
    'х',
    'Ц',
    'ц',
    'Ч',
    'ч',
    'Ш',
    'ш',
    'Щ',
    'щ',
    'Ъ',
    'ъ',
    'Ы',
    'ы',
    'Ь',
    'ь',
    'Э',
    'э',
    'Ю',
    'ю',
    'Я',
    'я'
};

char[] lettersTo = {
    'А',
    'а',
    'Б',
    'б',
    'В',
    'в',
    'Г',
    'г',
    'Д',
    'д',
    'Е',
    'е',
    'Ё',
    'ё',
    'Ж',
    'ж',
    'З',
    'з',
    'И',
    'и',
    'Й',
    'й',
    'К',
    'к',
    'Л',
    'л',
    'М',
    'м',
    'Н',
    'н',
    'О',
    'о',
    'П',
    'п',
    'Р',
    'р',
    'С',
    'с',
    'Т',
    'т',
    'У',
    'у',
    'Ф',
    'ф',
    'Х',
    'х',
    'Ц',
    'ц',
    'Ч',
    'ч',
    'Ш',
    'ш',
    'Щ',
    'щ',
    'Ъ',
    'ъ',
    'Ы',
    'ы',
    'Ь',
    'ь',
    'Э',
    'э',
    'Ю',
    'ю',
    'Я',
    'я',
    '-'
};

char[] items = { ',', '.',' ' };

List<string> toFind = new List<string>()
{
    " м. ",
    " ж. ",
    " ср. ",
};

List<string> words = new List<string>()
{
};


using (StreamReader sr = File.OpenText("C:\\Nortal\\scrabble\\matrix-scrabble\\Dictionary\\test.txt"))
{
    string s = String.Empty;
    while ((s = sr.ReadLine()) != null)
    {

        if (s.Length <= 0) continue;
        if (string.IsNullOrWhiteSpace(s.Trim())) continue;

        var index = s.IndexOfAny(items);
        if (index > 1) { 
            var firstWord = s.Substring(0, index).ToLower();
            var secondWord = s.Substring(index, s.Length - 1 - index).ToLower();

            if (secondWord.Contains(toFind[0]) || secondWord.Contains(toFind[1]) || secondWord.Contains(toFind[2]))
            {
                firstWord = firstWord.TrimEnd(digits);

                words.Add(firstWord);

            }
        }
        Console.WriteLine(s);
        //do minimal amount of work here
    }
    using (TextWriter tw = new StreamWriter("C:\\Nortal\\scrabble\\matrix-scrabble\\Dictionary\\dictionary.txt"))
    {
        foreach (string st in words)
            tw.WriteLine(st);
    }

    Console.WriteLine(words);
}

//сольфеджио
//узилище
//консервация