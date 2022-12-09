using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Repositories
{
	public interface IVideoRepository
	{
		Task<VideoEntity> Add(VideoBase video, Guid idUser);
		Task<List<VideoEntity>> GetAll();
		Task AddLike(Guid idVideo);
		Task Removelike(Guid idVideo);

		Task Comment(Guid idVideo, Guid idComment, Guid userId);
	}
}