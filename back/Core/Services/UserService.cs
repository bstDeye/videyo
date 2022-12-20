using Example.Api.Abstractions.Extensions;
using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;
using Example.Api.Abstractions.Transports.Playlist;
using Example.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace Example.Api.Core.Services
{
	public class UserService : IUserService
	{
		private readonly ILogger<UserService> logger;
		private readonly UserAssembler _userAssembler = new();
		private readonly PlaylistAssembler _playlistAssembler  = new();
		private readonly IUserRepository _userRepository;
		private readonly IPlaylistRepository _playlistRepository;

		public UserService(IUserRepository userRepository, ILogger<UserService> logger, IPlaylistRepository playlistRepository)
		{
			_userRepository = userRepository;
			this.logger = logger;
			_playlistRepository = playlistRepository;
		}

		public async Task<User> Add(string user)
		{
			
			var entity = await _userRepository.Add(user);
			var created = await _playlistRepository.Add(new PlaylistBase
			{
				Label = "Created",
				IdVideos = new List<Guid>(),
				User = entity.Id.AsGuid(),
				Type = PlaylistType.Created
			});
			var liked = await _playlistRepository.Add(new PlaylistBase
			{
				Label = "Liked",
				IdVideos = new List<Guid>(),
				User = entity.Id.AsGuid(),
				Type = PlaylistType.Liked
			});

			entity = await _userRepository.InitDefaultPlaylist(user, _playlistAssembler.Convert(created), _playlistAssembler.Convert(liked));
			
			return _userAssembler.Convert(entity);
		}
		
	}
}