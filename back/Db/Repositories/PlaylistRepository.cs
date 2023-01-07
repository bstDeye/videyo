using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Interfaces.Repositories;
using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports.Playlist;
using Videyo.Api.Abstractions.Transports.User;
using Videyo.Api.Db.Repositories.Internal;

namespace Videyo.Api.Db.Repositories;

public class PlaylistRepository :BaseRepository<PlaylistEntity>, IPlaylistRepository
{
    
    public PlaylistRepository(IConfiguration configuration, ILogger<BaseRepository<PlaylistEntity>> logger) : base(configuration, logger)
    {
    }
    public async Task<PlaylistEntity> Create(PlaylistBase playlist)
    {
        var entity = new PlaylistEntity
        {
            Label = playlist.Label,
            Videos = playlist.Videos,
            User = playlist.User,
            Type = playlist.Type,
        };

        await EntityCollection.InsertOneAsync(entity);
        return entity;

    }

    public async Task<List<PlaylistEntity>> GetAll()
    {
        return await EntityCollection.AsQueryable().ToListAsync();
    }

    public async Task AddVideoToPlayList(Guid idPlaylist, VideoEntity video)
    {
        var update = Builders<PlaylistEntity>.Update.Push(p => p.Videos, new ()
        {
            Id = video.Id.AsGuid(),
            Label = video.Label
        });
        var filter = Builders<PlaylistEntity>.Filter.Eq(p => p.Id, idPlaylist.AsObjectId());
        await EntityCollection.UpdateOneAsync(filter, update);

    }

    public async Task AddVideoToLiked(Guid idUser, VideoEntity video)
    {
        var playlist = await EntityCollection.AsQueryable().FirstOrDefaultAsync(p => p.User.Id == idUser && p.Type == PlaylistType.Liked);
        await AddVideoToPlayList(playlist.Id.AsGuid(), video);
    }

    public async Task AddVideoToCreated(Guid idUser, VideoEntity video)
    {
        var playlist = await EntityCollection.AsQueryable().FirstOrDefaultAsync(p => p.User.Id == idUser && p.Type == PlaylistType.Created);
        await AddVideoToPlayList(playlist.Id.AsGuid(), video);
    }

    public async Task RemoveVideoFromPlaylist(Guid idPlaylist, Guid idVideo)
    {
        var update = Builders<PlaylistEntity>.Update.PullFilter(p => p.Videos, plv => plv.Id == idVideo);
        var filter = Builders<PlaylistEntity>.Filter.Eq(p => p.Id, idPlaylist.AsObjectId());
        await EntityCollection.UpdateOneAsync(filter, update);
    }
    public async Task RemoveVideoFromLiked(Guid idUser, Guid idVideo)
    {
        var playlist = await EntityCollection.AsQueryable().FirstOrDefaultAsync(p => p.User.Id == idUser && p.Type == PlaylistType.Liked);
        await RemoveVideoFromPlaylist(playlist.Id.AsGuid(), idVideo);
    }

    public async Task RemoveVideoFromCreated(Guid idUser, Guid idVideo)
    {
        var playlist = await EntityCollection.AsQueryable().FirstOrDefaultAsync(p => p.User.Id == idUser && p.Type == PlaylistType.Created);
        await RemoveVideoFromPlaylist(playlist.Id.AsGuid(), idVideo);
    }

    public async Task<bool> IsOwner(Guid idUser, Guid idPlaylist)
    {
        return await EntityCollection.AsQueryable().AnyAsync(p => p.Id == idPlaylist.AsObjectId() && p.User.Id == idUser);
    }
}