using Microsoft.Extensions.Logging;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Interfaces.Repositories;
using Videyo.Api.Abstractions.Interfaces.Services;
using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Core.Assemblers;

namespace Videyo.Api.Core.Services;

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
		await _playlistRepository.AddVideoToCreated(idUser, entity);
		
		return _videoAssembler.Convert(entity);
	}
		
	public async Task<List<Video>> GetAll()
	{
		var entity = await _videoRepository.GetAll();
		return _videoAssembler.Convert(entity);
	}

	public async Task AddLike(Guid idVideo, Guid idUser)
	{
		
		var video = await _videoRepository.AddLike(idVideo);
		await _userRepository.Like(idUser, video);
		await _playlistRepository.AddVideoToLiked(idUser, video);
	}

	public async Task Removelike(Guid idVideo, Guid idUser)
	{
		var video = await _videoRepository.Removelike(idVideo);
		await _userRepository.DisLike(idUser, video);
		await _playlistRepository.RemoveVideoFromLiked(idUser, idVideo);
	}

	public async Task AddToPlayList(Guid idVideo, Guid idPlaylist)
	{
		var video = await _videoRepository.Get(idVideo);
		await _playlistRepository.AddVideoToPlayList(idPlaylist, video);
	}

	public async Task RemoveFromPlaylist(Guid idVideo, Guid idPlaylist, Guid idUser)
	{
		await _playlistRepository.RemoveVideoFromPlaylist(idPlaylist, idVideo);
	}
}