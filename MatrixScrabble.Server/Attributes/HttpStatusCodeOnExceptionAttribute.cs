using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MatrixScrabble.Server.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public class HttpStatusCodeOnExceptionAttribute : ExceptionFilterAttribute
{
	private static readonly Dictionary<int, string> StatusCodeReasonPhrases = new Dictionary<int, string>
	{
		[100] = "Continue",
		[101] = "Switching Protocols",
		[200] = "OK",
		[201] = "Created",
		[202] = "Accepted",
		[203] = "Non-Authoritative Information",
		[204] = "No Content",
		[205] = "Reset Content",
		[206] = "Partial Content",
		[300] = "Multiple Choices",
		[301] = "Moved Permanently",
		[302] = "Moved Temporarily",
		[303] = "See Other",
		[304] = "Not Modified",
		[305] = "Use Proxy",
		[400] = "Bad Request",
		[401] = "Unauthorized",
		[402] = "Payment Required",
		[403] = "Forbidden",
		[404] = "Not Found",
		[405] = "Method Not Allowed",
		[406] = "Not Acceptable",
		[407] = "Proxy Authentication Required",
		[408] = "Request Time-out",
		[409] = "Conflict",
		[410] = "Gone",
		[411] = "Length Required",
		[412] = "Precondition Failed",
		[413] = "Request Entity Too Large",
		[414] = "Request-URI Too Large",
		[415] = "Unsupported Media Type",
		[500] = "Internal Server Error",
		[501] = "Not Implemented",
		[502] = "Bad Gateway",
		[503] = "Service Unavailable",
		[504] = "Gateway Time-out",
		[505] = "HTTP Version not supported"
	};
	private readonly HttpStatusCode statusCode;
	protected readonly Type[] ExceptionTypes;

	public HttpStatusCodeOnExceptionAttribute(HttpStatusCode statusCode, params Type[] exceptionTypes)
	{
		this.statusCode = statusCode;
		ExceptionTypes = exceptionTypes;
	}

	public override void OnException(ExceptionContext context)
	{
		var tuple = ShouldCaptureException(context.Exception);

		if (!tuple.Item1)
			return;

		context.HttpContext.Response.StatusCode = (int)statusCode;
		context.Result = CreateResult(context.HttpContext.Request.Method, tuple.Item2);
		var httpResponseFeature = context.HttpContext.Features.Get<IHttpResponseFeature>();

		if (httpResponseFeature == null)
			return;

		httpResponseFeature.ReasonPhrase = GetReasonPhrase(statusCode);
	}

	private static IActionResult CreateResult(string requestMethod, Exception exception)
	{
		if (requestMethod.Equals("HEAD", StringComparison.OrdinalIgnoreCase))
			return new EmptyResult();

		return new ObjectResult(new { errorMessage = exception.Message });
	}

	private string GetReasonPhrase(HttpStatusCode httpStatusCode)
	{
		return !StatusCodeReasonPhrases.TryGetValue((int)statusCode, out var str)
			? httpStatusCode.ToString()
			: str;
	}

	private Tuple<bool, Exception?> ShouldCaptureException(Exception exception)
	{
		if (ExceptionTypes.Any(ex => ex.IsInstanceOfType(exception)))
			return Tuple.Create(true, (Exception?)exception);

		var innerException = exception.InnerException;

		if (innerException == null)
			return Tuple.Create(false, (Exception?)null);

		return ExceptionTypes.Any(ex => ex.IsInstanceOfType(innerException))
			? Tuple.Create(true, (Exception?)innerException)
			: Tuple.Create(false, (Exception?)null);
	}
}