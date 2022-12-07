using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Services
{
	public interface IVideoService
	{
		Task<Video> Add(VideoBase video ); 
		Task<List<Video>> GetAll();

	}
}