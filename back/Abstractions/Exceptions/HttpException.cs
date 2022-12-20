using System.Net;

namespace Example.Api.Abstractions.Exceptions;

public class HttpException: Exception
{
    public HttpStatusCode Code { get; }

    public HttpException(HttpStatusCode code, string? message, Exception? innerException) : base(message, innerException)
    {
        Code = code;
    }
}