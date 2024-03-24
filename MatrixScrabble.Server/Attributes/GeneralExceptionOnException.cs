using System.Net;

namespace MatrixScrabble.Server.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class GeneralExceptionOnException : HttpStatusCodeOnExceptionAttribute
{
	public string Message { get; set; }

    public GeneralExceptionOnException(params Type[] exceptionTypes)
        : base(HttpStatusCode.BadRequest, exceptionTypes)
    {
    }
}