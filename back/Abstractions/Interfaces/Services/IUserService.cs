using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Services
{
	public interface IUserService
	{
		Task<User> Add(string user);
		
		
	}
}