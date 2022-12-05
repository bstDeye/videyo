using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Example.Api.Web.Filters;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace Example.Api.Web.Controllers
{
	[Route("api/todo")]
	[ApiController]
	public class TodoController : ControllerBase
	{
		private readonly ITodoService todoService;

		public TodoController(ITodoService todoService)
		{
			this.todoService = todoService;
		}

		[HttpGet]
		[SwaggerResponse(HttpStatusCode.OK, typeof(List<Todo>))]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await todoService.GetAll());
		}

		[HttpPut("{id:guid}/toggle")]
		[SwaggerResponse(HttpStatusCode.OK, typeof(Todo))]
		public async Task<IActionResult> Check(Guid id)
		{
			return Ok(await todoService.Check(id));
		}


		[RequireAuth]
		[HttpPost]
		[SwaggerResponse(HttpStatusCode.OK, typeof(Todo))]
		public async Task<IActionResult> Add([FromBody] string label)
		{
			return Ok(await todoService.Add(label));
		}

		[RequireAuth]
		[HttpDelete("{id:guid}")]
		[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
		public async Task<IActionResult> Delete(Guid id)
		{
			await todoService.Delete(id);
			return NoContent();
		}
	}
}