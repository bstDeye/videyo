using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports.Playlist;

namespace Videyo.Api.Abstractions.Interfaces.Repositories;

public interface IPlaylistRepository
{
	Task<PlaylistEntity> Create(PlaylistBase playlist);
	Task<List<PlaylistEntity>> GetAll();
	Task AddVideoToPlayList(Guid idPlaylist, VideoEntity video);
	Task AddVideoToLiked(Guid idUser, VideoEntity video);
	Task AddVideoToCreated(Guid idUser,VideoEntity video);
	Task RemoveVideoFromPlaylist(Guid idPlaylist, Guid idVideo);
	Task RemoveVideoFromLiked(Guid idUser, Guid idVideo);
	Task RemoveVideoFromCreated(Guid idUser, Guid idVideo);

	Task<bool> IsOwner(Guid idUser, Guid idPlaylist);
}