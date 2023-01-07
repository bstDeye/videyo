using System.Net;

namespace Videyo.Api.Abstractions.Exceptions;

public class HttpException : Exception
{
    public HttpStatusCode Code { get; }

    public HttpException(HttpStatusCode code, string? message = null, Exception? innerException = null) : base(message, innerException)
    {
        Code = code;
    }
}