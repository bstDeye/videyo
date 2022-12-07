using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Example.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace Example.Api.Core.Services
{
	public class PlaylistService : IPlaylistService
	{
		private readonly ILogger<PlaylistService> logger;
		private readonly PlaylistAssembler _playlistAssembler = new();
		private readonly IPlaylistRepository _playlistRepository;

		public PlaylistService(IPlaylistRepository playlistRepository, ILogger<PlaylistService> logger)
		{
			this._playlistRepository = playlistRepository;
			this.logger = logger;
		}


		public async Task<Playlist> Add(PlaylistBase playlist)
		{
			var entity = await _playlistRepository.Add(playlist);
			return _playlistAssembler.Convert(entity);
		}

		public async Task<List<Playlist>> GetAll()
		{

			var entity = await _playlistRepository.GetAll();
			return _playlistAssembler.Convert(entity);


		}
	}
}