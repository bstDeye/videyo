using Example.Api.Abstractions.Extensions;
using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;
using Example.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Example.Api.Db.Repositories
{
	internal class VideoRepository : BaseRepository<VideoEntity>, IVideoRepository
	{
		public VideoRepository(IConfiguration configuration, ILogger<BaseRepository<VideoEntity>> logger) : base(configuration, logger)
		{
		}


		public async Task<VideoEntity> Add(VideoBase video)
		{
			var entity = new VideoEntity
			{
				Label = video.Label,
				User = video.User,
				Origin = video.Origin,
				Commentaires = video.Commentaires,
			};
			await EntityCollection.InsertOneAsync(entity);
			return entity;
		}
		
		public async Task<List<VideoEntity>> GetAll()
		{
			return await EntityCollection.AsQueryable().ToListAsync();
		}

	

	
	}
}