using Example.Api.Abstractions.Extensions;
using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;
using Example.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Example.Api.Db.Repositories;

public class VideoRepository : BaseRepository<VideoEntity>,IVideoRepository
{
    public VideoRepository(IConfiguration configuration, ILogger<BaseRepository<VideoEntity>> logger) : base(configuration, logger)
    {
    }
    public async Task<VideoEntity> Add(VideoBase video, Guid idUser)
    {
        var entity = new VideoEntity
        {
            Label = video.Label,
            Origin = video.Origin,
            Comments = video.Comments,
            User = idUser,
            NbLikes = 0
        };
        
        await EntityCollection.InsertOneAsync(entity);
        return entity;
    }

    public async Task<List<VideoEntity>> GetAll()
    {
        return await EntityCollection.AsQueryable().ToListAsync();
    }

    public async Task AddLike(Guid idVideo)
    {
        var update = Builders<VideoEntity>.Update.Inc(video => video.NbLikes, -1);
        await EntityCollection.UpdateOneAsync(video => video.Id == idVideo.AsObjectId(), update);
    }

    public async Task Removelike(Guid idVideo)
    {
        var video = await EntityCollection.AsQueryable().Where(video => video.Id == idVideo.AsObjectId()).FirstOrDefaultAsync();
        video.NbLikes -= 1;
        await EntityCollection.ReplaceOneAsync(v => v.Id == video.Id, video);
    }

    public async Task Comment(Guid idVideo, string content, string userId)
    {
        var comment = new Commentaire
        {
            Id = Guid.NewGuid(),
            AnsweredTo = default,
            Text = content,
            User = userId
        };
        
        var update = Builders<VideoEntity>.Update.Push(video => video.Comments, comment);
        await EntityCollection.UpdateOneAsync(video => video.Id == idVideo.AsObjectId(), update);
        
    }

   
}