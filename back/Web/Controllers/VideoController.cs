using System.Net;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using Videyo.Api.Abstractions.Interfaces.Services;
using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Abstractions.Transports.Playlist;
using Videyo.Api.Adapters.AuthenticationApi;
using Videyo.Api.Web.Filters;

namespace Videyo.Api.Web.Controllers;

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
    [SwaggerResponse(HttpStatusCode.OK, typeof(List<Video>))]
    public async Task<IActionResult> GetAllVideos()
    {
        return Ok(await _videoService.GetAll());
    }

    [HttpPost("{idUser:guid}")]
    [SwaggerResponse(HttpStatusCode.OK, typeof(Video))]
    [Authorize(VideyoRole.User)]
    public async Task<IActionResult> AddVideo([FromBody] VideoBase video, Guid idUser)
    {
        return Ok(await _videoService.Add(video, idUser));
    }

    [HttpPost("{idUser:guid}/{idVideo:guid}")]
    [Authorize(VideyoRole.User)]
    [SwaggerResponse(HttpStatusCode.NoContent, typeof(Video))]
    public async Task<IActionResult> AddLike(Guid idVideo, Guid idUser)
    {
        await _videoService.AddLike(idVideo, idUser);
        return NoContent();
    }


    [HttpDelete("{idUser:guid}/{idVideo:guid}")]
    [Authorize(VideyoRole.User)]
    [SwaggerResponse(HttpStatusCode.NoContent, typeof(Video))]
    public async Task<IActionResult> RemoveLike(Guid idVideo, Guid idUser)
    {
        await _videoService.Removelike(idVideo, idUser);
        return NoContent();
    }


    [HttpDelete]
    [Route("from-playlist")]
    [Authorize(VideyoRole.User)]
    [SwaggerResponse(HttpStatusCode.NoContent, typeof(Playlist))]
    public async Task<IActionResult> RemoveFromPlaylist(Guid idVideo, Guid idPlaylist, Guid idUser)
    {
        await _videoService.RemoveFromPlaylist(idVideo, idPlaylist, idUser);
        return NoContent();
    }
}