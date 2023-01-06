using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Interfaces.Repositories;
using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Db.Repositories.Internal;

namespace Videyo.Api.Db.Repositories;

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
        var update = Builders<VideoEntity>.Update.Inc(video => video.NbLikes, +1);
        await EntityCollection.UpdateOneAsync(video => video.Id == idVideo.AsObjectId(), update);
    }

    public async Task Removelike(Guid idVideo)
    {
        var video = await EntityCollection.AsQueryable().Where(video => video.Id == idVideo.AsObjectId()).FirstOrDefaultAsync();
        video.NbLikes -= 1;
        await EntityCollection.ReplaceOneAsync(v => v.Id == video.Id, video);
    }

    public async Task AddComment(Guid idVideo, string content, string userId, Guid answeredTo = default)
    {
        var comment = new Commentaire
        {
            Id = Guid.NewGuid(),
            AnsweredTo = answeredTo,
            Text = content,
            User = userId
        };
        
        var update = Builders<VideoEntity>.Update.Push(video => video.Comments, comment);
        await EntityCollection.UpdateOneAsync(video => video.Id == idVideo.AsObjectId(), update);
        
    }

    public async Task RemoveComment(Guid idVideo, Guid idComment)
    {
        var update = Builders<VideoEntity>.Update.PullFilter(v => v.Comments, commentaire => commentaire.Id == idComment);
        await EntityCollection.UpdateOneAsync(entity => entity.Id == idVideo.AsObjectId(), update);
    }

    public async Task EditComment(Guid idVideo, Guid idComment, string content)
    {
        var video = await EntityCollection.AsQueryable().FirstOrDefaultAsync(v => v.Id == idVideo.AsObjectId());
        var comment = video.Comments.Find(c => c.Id == idComment);
        comment.Text = content;
        await EntityCollection.ReplaceOneAsync(v => v.Id == video.Id, video);

    }
}