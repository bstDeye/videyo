using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Adapters.AuthenticationApi;

namespace Example.Api.Core.Services
{
	internal class AuthenticationService : IAuthenticationService
	{
		private readonly IAuthenticationClient authenticationApi;
		private readonly IUsersClient usersApi;

		public AuthenticationService(IAuthenticationClient authenticationApi, IUsersClient usersApi)
		{
			this.authenticationApi = authenticationApi;
			this.usersApi = usersApi;
		}

		public async Task<bool> IsLogged(string token)
		{
			return await authenticationApi.ValidToken2Async(token);
		}

		public async Task<string> GetUsername(string token)
		{
			return await usersApi.GetUserInfoAsync(Kind.Username, token);
		}
	}
}