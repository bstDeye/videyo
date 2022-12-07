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

		public VideoService(IVideoRepository videoRepository, ILogger<VideoService> logger)
		{
			this._videoRepository = videoRepository;
			this.logger = logger;
		}


		public async Task<Video> Add(VideoBase video)
		{
			var entity = await _videoRepository.Add(video);
			return _videoAssembler.Convert(entity);
		}

		public async Task<List<Video>> GetAll()
		{
			var entity = await _videoRepository.GetAll();
			return _videoAssembler.Convert(entity);
		}
	}
}