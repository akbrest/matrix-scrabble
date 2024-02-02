namespace MatrixScrabble.Server.Exceptions
{
    public class ResourceNotFoundException : Exception
    {
        public ResourceNotFoundException()
        {
        }

        public ResourceNotFoundException(string message)
          : base(message)
        {
        }

        public ResourceNotFoundException(string resourceName, object resourceId)
          : base($"Resource {resourceName}:{resourceId} not found")
        {
        }
    }
}
