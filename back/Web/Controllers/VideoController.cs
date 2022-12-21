﻿using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;
using Example.Api.Abstractions.Transports.Playlist;
using Example.Api.Web.Filters;
using Microsoft.AspNetCore.Http.HttpResults;
using ZstdSharp.Unsafe;

namespace Example.Api.Web.Controllers
{
	[Route("api/videos")]
	[ApiController]
	public class VideoController : ControllerBase
	{
		private readonly IVideoService _videoService;
		private readonly IPlaylistService _playlistService;

		public VideoController(IVideoService videoService, IPlaylistService playlistService)
		{
			this._videoService = videoService;
			_playlistService = playlistService;
		}

		[HttpGet]
		[Route("get-all")]
		[SwaggerResponse(HttpStatusCode.OK, typeof(List<Video>))]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await _videoService.GetAll());
		}
		
		[HttpPost]
		[Route("add")]

		[SwaggerResponse(HttpStatusCode.OK, typeof(Video))]
		[RequireAuth]
		public async Task<IActionResult> Add([FromBody] VideoBase video, Guid idUser)
		{
			return Ok(await _videoService.Add(video, idUser));
		}

		[HttpPost]
		[Route("like")]
		[RequireAuth]
		[SwaggerResponse(HttpStatusCode.NoContent, typeof(Video))]
		public async Task<IActionResult> AddLike(Guid idVideo, Guid idUser)
		{
			await _videoService.AddLike(idVideo, idUser);
			return NoContent();
		}
		
		
		[HttpDelete]
		[Route("like")]
		[RequireAuth]
		[SwaggerResponse(HttpStatusCode.NoContent,typeof(Video))]
		public async Task<IActionResult> RemoveLike(Guid idVideo, Guid idUser)
		{
			await _videoService.Removelike(idVideo, idUser);
			return NoContent();
		}

		[HttpPost]
		[Route("to-playlist")]
		[SwaggerResponse(HttpStatusCode.NoContent, typeof(Playlist))]
		public async Task<IActionResult> AddToPlaylist(Guid idVideo, Guid idPlaylist, Guid idUser)
		{
			await _videoService.AddToPlayList(idVideo, idPlaylist );
			return NoContent();
		}
		
		[HttpDelete]
		[Route("from-playlist")]
		[SwaggerResponse(HttpStatusCode.NoContent, typeof(Playlist))]
		public async Task<IActionResult> RemoveFromPlaylist(Guid idVideo, Guid idPlaylist, Guid idUser)
		{
			await _videoService.RemoveFromPlaylist(idVideo, idPlaylist, idUser );
			return NoContent();
		}
	}
}