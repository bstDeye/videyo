using System.Net;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using Videyo.Api.Abstractions.Interfaces.Services;
using Videyo.Api.Abstractions.Transports.Playlist;
using Videyo.Api.Abstractions.Transports.Requests;
using Videyo.Api.Adapters.AuthenticationApi;
using Videyo.Api.Web.Filters;

namespace Videyo.Api.Web.Controllers;

[Route("api/playlist")]
[ApiController]
public class PlaylistController : ControllerBase
{
    private readonly IPlaylistService _playlistService;
    private readonly IVideoService _videoService;

    public PlaylistController(IPlaylistService playlistService, IVideoService videoService)
    {
        this._playlistService = playlistService;
        _videoService = videoService;
    }

    [HttpGet]
    [SwaggerResponse(HttpStatusCode.OK, typeof(List<Playlist>))]
    public async Task<IActionResult> GetAllPlaylists()
    {
        return Ok(await _playlistService.GetAll());
    }

    [HttpPost]
    [SwaggerResponse(HttpStatusCode.OK, typeof(Playlist))]
    public async Task<IActionResult> AddPlaylist([FromBody] PlaylistBase playlist)
    {
        return Ok(await _playlistService.Create(playlist));
    }
    [HttpPost("{idPlaylist:guid}")]
    [Authorize(VideyoRole.User)]
    [SwaggerResponse(HttpStatusCode.NoContent, typeof(Playlist))]
    public async Task<IActionResult> AddToPlaylist([FromBody]AddToPlaylistRequest rq, [FromRoute]Guid idPlaylist)
    {
        await _playlistService.Link(rq.IdUser, rq.IdVideo, idPlaylist );
        return NoContent();
    }
    
}