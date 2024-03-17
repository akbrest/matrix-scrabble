namespace MatrixScrabble.Server.Exceptions;
public class SameWordUsedException : Exception
{
	public SameWordUsedException()
	{
	}

	public SameWordUsedException(string message)
	  : base(message)
	{
	}

	public SameWordUsedException(string resourceName, object resourceId)
	  : base($"Resource {resourceName}:{resourceId} not found")
	{
	}
}
