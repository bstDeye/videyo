using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace Example.Api.Web.Controllers
{
	[Route("api/videos")]
	[ApiController]
	public class VideoController : ControllerBase
	{
		private readonly IVideoService _videoService;

		public VideoController(IVideoService videoService)
		{
			this._videoService = videoService;
		}

		[HttpGet]
		[SwaggerResponse(HttpStatusCode.OK, typeof(List<Video>))]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await _videoService.GetAll());
		}
		
		[HttpPost]
		[SwaggerResponse(HttpStatusCode.OK, typeof(Video))]
		public async Task<IActionResult> Add([FromBody] VideoBase video)
		{
			return Ok(await _videoService.Add(video));
		}

	}
}