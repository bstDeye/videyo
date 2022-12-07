using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Services
{
	public interface IPlaylistService
	{
		Task<Playlist> Add(PlaylistBase playlist); 
		Task<List<Playlist>> GetAll();

	}
}