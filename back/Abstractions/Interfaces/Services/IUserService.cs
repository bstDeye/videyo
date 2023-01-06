using Videyo.Api.Abstractions.Transports;

namespace Videyo.Api.Abstractions.Interfaces.Services;

public interface IUserService
{
	Task<User> Add(string user);
		
	Task<List<User>> GetUsers();

}