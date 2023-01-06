using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Videyo.Api.Abstractions.Exceptions;

namespace Videyo.Api.Web.Filters;

public class Machin : ExceptionFilterAttribute
{
	public override void OnException(ExceptionContext context)
	{
		if (context.Exception is HttpException e)
		{
			context.Result = new StatusCodeResult((int)e.Code);
		}
		base.OnException(context);
	}
}