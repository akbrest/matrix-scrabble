namespace MatrixScrabble.Server;

public static class Constants
{
	public static class ErrorMessage
	{
		public const string InvalidLanguage = "Invalid language.";
		public const string LengthIsNotCorrect = "Length is not correct.";
		public const string GameHasAlreadyConfirmed = "The game has already confirmed.";
	}

	public static class Game
	{
		public const int DefaultFixedLetters = 2;
		public const int MinimumWordLength = 3;
	}
}