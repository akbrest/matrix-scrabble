namespace MatrixScrabble.Server.Exceptions
{
    public class DuplicateWordsExceptions : Exception
    {
        public DuplicateWordsExceptions()
        {
        }

        public DuplicateWordsExceptions(string message)
          : base(message)
        {
        }

        public DuplicateWordsExceptions(string resourceName, object resourceId)
          : base($"Resource {resourceName}:{resourceId} not found")
        {
        }
    }
}
