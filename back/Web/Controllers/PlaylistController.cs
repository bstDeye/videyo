using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Example.Api.Web.Filters;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;
using Example.Api.Abstractions.Transports.Playlist;

namespace Example.Api.Web.Controllers
{
    [Route("api/playlist")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly IPlaylistService _playlistService;

        public PlaylistController(IPlaylistService playlistService)
        {
            this._playlistService = playlistService;
        }

        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<Playlist>))]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _playlistService.GetAll());
        }

        [HttpPost]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Playlist))]
        public async Task<IActionResult> Add([FromBody] PlaylistBase playlist)
        {
            return Ok(await _playlistService.Add(playlist));
        }
    }
}