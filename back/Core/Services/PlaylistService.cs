using System.Net;
using Microsoft.Extensions.Logging;
using Videyo.Api.Abstractions.Exceptions;
using Videyo.Api.Abstractions.Helpers;
using Videyo.Api.Abstractions.Interfaces.Repositories;
using Videyo.Api.Abstractions.Interfaces.Services;
using Videyo.Api.Abstractions.Transports.Playlist;
using Videyo.Api.Adapters.AuthenticationApi;
using Videyo.Api.Core.Assemblers;

namespace Videyo.Api.Core.Services;

public class PlaylistService : IPlaylistService
{
	private readonly ILogger<PlaylistService> _logger;
	private readonly PlaylistAssembler _playlistAssembler = new();
	private readonly IPlaylistRepository _playlistRepository;
	private readonly IVideoRepository _videoRepository;

	public PlaylistService(IPlaylistRepository playlistRepository, ILogger<PlaylistService> logger, IVideoRepository videoRepository)
	{
		this._playlistRepository = playlistRepository;
		this._logger = logger;
		_videoRepository = videoRepository;
	}


	public async Task<Playlist> Create(PlaylistBase playlist)
	{
		var entity = await _playlistRepository.Create(playlist);
		return _playlistAssembler.Convert(entity);
	}

	public async Task<List<Playlist>> GetAll()
	{

		var entity = await _playlistRepository.GetAll();
		return _playlistAssembler.Convert(entity);


	}

	public async Task Link(Guid idUser, Guid idVideo, Guid idPlaylist)
	{
		var logger = _logger.Enter($"{Log.Format(idUser)} {Log.Format(idVideo)} {Log.Format(idPlaylist)}");
		var isOwner = await _playlistRepository.IsOwner(idUser, idPlaylist);

		if (!isOwner) throw new HttpException(HttpStatusCode.Forbidden, "Vous ne pouvez pas modifier cette playlist");
		var video = await _videoRepository.Get(idVideo);
		await _playlistRepository.AddVideoToPlayList(idPlaylist, video);
		
		logger.Exit();

	}
}