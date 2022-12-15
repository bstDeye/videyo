using Example.Api.Abstractions.Transports;
using Example.Api.Abstractions.Transports.Playlist;

namespace Example.Api.Abstractions.Interfaces.Services
{
	public interface IPlaylistService
	{
		Task<Playlist> Add(PlaylistBase playlist); 
		Task<List<Playlist>> GetAll();

	}
}