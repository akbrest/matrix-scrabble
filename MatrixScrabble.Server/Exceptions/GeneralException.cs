namespace MatrixScrabble.Server.Exceptions
{
    public class GeneralException : Exception
    {
		public string _errorMessage { get; set; }
		public string _errorType { get; set; }

		public int ErrorCode { get; set; }

		public GeneralException()
        {
        }

        public GeneralException(string message, string type)
          : base(message)
        {
			this._errorMessage = message;
			this._errorType = type;
		}
    }
}
