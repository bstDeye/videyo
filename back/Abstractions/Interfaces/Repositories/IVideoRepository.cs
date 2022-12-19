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
		Task AddComment(Guid idVideo, string content, string userId, Guid answeredTo = default);
		Task RemoveComment(Guid idVideo, Guid idComment);
		Task EditComment(Guid idVideo, Guid idComment, string content);
	}
}