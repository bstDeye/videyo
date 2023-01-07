using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports;

namespace Videyo.Api.Abstractions.Interfaces.Repositories;

public interface IVideoRepository
{
	Task<VideoEntity> Add(VideoBase video, Guid idUser);
	Task<List<VideoEntity>> GetAll();
	Task<VideoEntity> AddLike(Guid idVideo);
	Task<VideoEntity> Removelike(Guid idVideo);
	Task AddComment(Guid idVideo, string content, string userId, Guid answeredTo = default);
	Task RemoveComment(Guid idVideo, Guid idComment);
	Task EditComment(Guid idVideo, Guid idComment, string content);
	Task<VideoEntity> Get(Guid idVideo);
}