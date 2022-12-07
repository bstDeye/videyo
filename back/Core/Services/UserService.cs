using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Example.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace Example.Api.Core.Services
{
	public class UserService : IUserService
	{
		private readonly string defaultUser = "public";
		private readonly ILogger<UserService> logger;
		private readonly UserAssembler _userAssembler = new();
		private readonly IUserRepository _userRepository;

		public UserService(IUserRepository userRepository, ILogger<UserService> logger)
		{
			this._userRepository = userRepository;
			this.logger = logger;
		}

		public async Task<User> Add(UserBase user)
		{
			var entity = await _userRepository.Add(user);
			return _userAssembler.Convert(entity);
		}
	}
}