using Videyo.Api.Abstractions.Transports;

namespace Videyo.Api.Abstractions.Interfaces.Services;

public interface IVideoService
{
    Task<Video> Add(VideoBase video, Guid idUser);
    Task<List<Video>> GetAll();
    Task AddLike(Guid idVideo, Guid idUser);
    Task Removelike(Guid idVideo, Guid idUser);
    Task AddToPlayList(Guid idVideo, Guid idPlaylist);
    Task RemoveFromPlaylist(Guid idVideo, Guid playlistId, Guid userId);
}