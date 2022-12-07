using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Services
{
	public interface IUserService
	{
		Task<User> Add(UserBase user);
		Task Like(Guid videoId);

		Task Dislike(Guid videoId);

		Task AddToPlayList(Guid videoId);
		
		
	}
}