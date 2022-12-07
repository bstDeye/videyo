using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Repositories
{
	public interface IUserRepository
	{
		Task<UserEntity> Add(UserBase user);

	}
}