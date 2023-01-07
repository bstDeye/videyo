using System.Net;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using Videyo.Api.Abstractions.Interfaces.Services;
using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Abstractions.Transports.User;

namespace Videyo.Api.Web.Controllers;

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
    public async Task<IActionResult> AddUser([FromBody] string user)
    {
        return Ok(await _userService.Add(user));
    }

    [HttpGet]
    [SwaggerResponse(HttpStatusCode.OK, typeof(List<User>))]
    public async Task<IActionResult> GetUsers()
    {
        return Ok(await _userService.GetUsers());
    }
}