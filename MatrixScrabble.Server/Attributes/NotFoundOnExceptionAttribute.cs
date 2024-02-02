using System.Net;

namespace MatrixScrabble.Server.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class NotFoundOnExceptionAttribute : HttpStatusCodeOnExceptionAttribute
    {
        public NotFoundOnExceptionAttribute(params Type[] exceptionTypes)
          : base(HttpStatusCode.NotFound, exceptionTypes)
        {
        }
    }
}
