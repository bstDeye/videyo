using System.Net;
using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Example.Api.Web.Controllers
{
	[Route("api/videos")]
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
		public async Task<IActionResult> Add([FromBody] UserBase user)
		{
			return Ok(await _userService.Add(user));
		}
	}
}