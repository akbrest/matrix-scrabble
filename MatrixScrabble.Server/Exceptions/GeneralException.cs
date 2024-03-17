namespace MatrixScrabble.Server.Exceptions;

public class GeneralException : Exception
{
	public string ErrorMessage { get; set; }

	public GeneralException(string message)
	  : base(message)
	{
		ErrorMessage = message;
	}
}
