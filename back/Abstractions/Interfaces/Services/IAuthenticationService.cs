namespace Example.Api.Abstractions.Interfaces.Services
{
	public interface IAuthenticationService
	{
		Task<bool> IsLogged(string token);
		Task<string> GetUsername(string token);
	}
}