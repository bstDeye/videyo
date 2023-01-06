using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Videyo.Api.Abstractions.Interfaces.Services;
using Videyo.Api.Adapters.AuthenticationApi;

namespace Videyo.Api.Web.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    private readonly VideyoRole _role;


    public AuthorizeAttribute(VideyoRole role)
    {
        _role = role;
    }

    /// <inheritdoc />
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var svc = context.HttpContext.RequestServices;
        var tokenService = svc.GetRequiredService<IAuthenticationService>();

        // skip authorization if action is decorated with [AllowAnonymous] attribute
        var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
        if (allowAnonymous)
            return;


        var bearer = context.HttpContext.Request.Headers.Authorization.ToString();

        if (!tokenService.ValidateJwt(bearer, out var token))
        {
            context.Result = new JsonResult(new
            {
                status = "Unauthorized"
            })
            {
                StatusCode = StatusCodes.Status401Unauthorized
            };
            return;
        }


        var userStr = token!.Payload["data"].ToString()!;

        var user = JsonConvert.DeserializeObject<User>(userStr);

        context.HttpContext.Items["user"] = user;

        if (user.Authorizations.Videyo?.Roles.Contains(_role) != true)
            context.Result = new JsonResult(new
            {
                status = "Forbidden",
                missingRole = _role
            })
            {
                StatusCode = StatusCodes.Status403Forbidden
            };




    }
}