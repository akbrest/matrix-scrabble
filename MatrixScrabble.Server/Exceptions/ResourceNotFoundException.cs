namespace MatrixScrabble.Server.Exceptions;
public class ResourceNotFoundException : Exception
{
	public ResourceNotFoundException()
	{
	}

	public ResourceNotFoundException(string resourceName, object resourceId)
	  : base($"Resource {resourceName}: {resourceId} not found")
	{
	}
}
