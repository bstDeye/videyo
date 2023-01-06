using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Abstractions.Transports.Playlist;

namespace Videyo.Api.Abstractions.Interfaces.Services;

public interface IPlaylistService
{
	Task<Playlist> Create(PlaylistBase playlist); 
	Task<List<Playlist>> GetAll();


	Task Link(Guid idUser, Guid idVideo, Guid idPlaylist);
}