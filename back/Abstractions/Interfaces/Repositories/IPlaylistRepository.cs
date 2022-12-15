using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports.Playlist;

namespace Example.Api.Abstractions.Interfaces.Repositories
{
	public interface IPlaylistRepository
	{
		Task<PlaylistEntity> Add(PlaylistBase playlist);
		Task<List<PlaylistEntity>> GetAll();
		Task AddVideoToPlayList(Guid idPlaylist, Guid idVideo);
		Task AddVideoToLiked(Guid idUser, Guid idVideo);
		Task RemoveVideoFromPlaylist(Guid idPlaylist, Guid idVideo);
		Task RemoveVideoFromLiked(Guid idUser, Guid idVideo);

	}
}