using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Example.Api.Web.Filters;
using Example.Api.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace Example.Api.Web.Controllers
{
	[Route("api/todo/user")]
	[ApiController]
	public class TodoUserController : ControllerBase
	{
		private readonly ITodoService todoService;

		public TodoUserController(ITodoService todoService)
		{
			this.todoService = todoService;
		}

		[RequireAuth]
		[HttpDelete("{id:guid}")]
		[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
		public async Task<IActionResult> DeleteForUser(Guid id)
		{
			await todoService.DeleteForUser(id, AuthUtility.GetUsername(Request));
			return NoContent();
		}


		[RequireAuth]
		[HttpPost("")]
		[SwaggerResponse(HttpStatusCode.Created, typeof(Todo))]
		public async Task<IActionResult> AddForUser([FromBody] string label)
		{
			var todo = await todoService.AddForUser(label, AuthUtility.GetUsername(Request));
			return Created($"/{todo.Id}", todo);
		}


		[RequireAuth]
		[HttpGet("")]
		[SwaggerResponse(HttpStatusCode.OK, typeof(List<Todo>))]
		public async Task<IActionResult> GetAllForUser()
		{
			var user = AuthUtility.GetUsername(Request);
			return Ok(await todoService.GetAllForUser(user));
		}


		[RequireAuth]
		[HttpPut("{id:guid}/toggle")]
		[SwaggerResponse(HttpStatusCode.OK, typeof(Todo))]
		public async Task<IActionResult> CheckForUser(Guid id)
		{
			return Ok(await todoService.CheckForUser(id, AuthUtility.GetUsername(Request)));
		}
	}
}