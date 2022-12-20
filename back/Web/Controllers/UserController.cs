using System.Net;
using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Example.Api.Web.Controllers
{
	[Route("api/user")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserService _userService;

		public UserController(IUserService userService)
		{
			this._userService = userService;
		}
		[HttpPost]
		[SwaggerResponse(HttpStatusCode.OK, typeof(User))]
		[SwaggerResponse(HttpStatusCode.Conflict, typeof(void))]
		public async Task<IActionResult> Add([FromBody] string user)
		{
			return Ok(await _userService.Add(user));
		}
	}
}