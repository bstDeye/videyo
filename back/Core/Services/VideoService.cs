using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Example.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace Example.Api.Core.Services
{
	public class VideoService : IVideoService
	{
		private readonly ILogger<VideoService> logger;
		private readonly VideoAssembler _videoAssembler = new();
		private readonly IVideoRepository _videoRepository;

		private readonly IUserRepository _userRepository;
		private readonly IPlaylistRepository _playlistRepository;
		
		public VideoService(IVideoRepository videoRepository, ILogger<VideoService> logger, IUserRepository userRepository, IPlaylistRepository playlistRepository)
		{
			_videoRepository = videoRepository;
			this.logger = logger;
			_userRepository = userRepository;
			_playlistRepository = playlistRepository;
		}


		public async Task<Video> Add(VideoBase video, Guid idUser)
		{
			var entity = await _videoRepository.Add(video, idUser);
			return _videoAssembler.Convert(entity);
		}
		
		public async Task<List<Video>> GetAll()
		{
			var entity = await _videoRepository.GetAll();
			return _videoAssembler.Convert(entity);
		}

		public async Task AddLike(Guid idVideo, Guid idUser)
		{
			await _videoRepository.AddLike(idVideo);
			await _userRepository.Like(idUser);
			await _playlistRepository.AddVideoToLiked(idUser, idVideo);
		}

		public async Task Removelike(Guid idVideo, Guid idUser)
		{
			await _videoRepository.Removelike(idVideo);
			await _userRepository.DisLike(idUser);
			await _playlistRepository.RemoveVideoFromLiked(idUser, idVideo);
		}

		public async Task AddToPlayList(Guid idVideo, Guid idPlaylist)
		{
			await _playlistRepository.AddVideoToPlayList(idPlaylist, idVideo);
		}

		public async Task RemoveFromPlaylist(Guid idVideo, Guid idPlaylist, Guid idUser)
		{
			await _playlistRepository.RemoveVideoFromPlaylist(idPlaylist, idVideo);
		}
	}
}