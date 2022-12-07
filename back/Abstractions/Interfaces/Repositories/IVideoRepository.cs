using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Repositories
{
	public interface IVideoRepository
	{
		Task<VideoEntity> Add(VideoBase video);
		Task<List<VideoEntity>> GetAll();
		
	}
}