
using MatrixScrabble.Server.Dtos;
using MatrixScrabble.Server.Exceptions;
using System.Text.Json;

public class ErrorHandlerMiddleware
{
	private readonly RequestDelegate _next;
	public ErrorHandlerMiddleware(RequestDelegate next)
	{
		_next = next;
	}
	public async Task Invoke(HttpContext context)
	{
		try
		{
			await _next(context);
		}
		catch (Exception error)
		{
			var response = context.Response;
			//Set response ContentType
			response.ContentType = "application/json";

			//Set custome error message for response model
			var responseContent = new ResponseContent()
			{
				Message = error.Message
			};
			//handler many Exception types
			switch (error)
			{
				case ArgumentException _ae:
					response.StatusCode = StatusCodes.Status400BadRequest;
					break;
				case GeneralException _ae:
					response.StatusCode = StatusCodes.Status400BadRequest;
					break;
				default:
					response.StatusCode = StatusCodes.Status500InternalServerError;
					break;
			}
			//Using Newtonsoft.Json to convert object to json string
			var jsonResult = JsonSerializer.Serialize(responseContent);
			await response.WriteAsync(jsonResult);
		}
	}
	//Response Model
	public class ResponseContent
	{
		public string Message { get; set; }
	}
}