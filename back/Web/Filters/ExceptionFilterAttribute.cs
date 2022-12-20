using Example.Api.Abstractions.Exceptions;
using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using NJsonSchema;
using NSwag;
using NSwag.Generation.Processors;
using NSwag.Generation.Processors.Contexts;

namespace Example.Api.Web.Filters
{
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
}