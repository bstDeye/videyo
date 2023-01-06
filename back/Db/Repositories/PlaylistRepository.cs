using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Interfaces.Repositories;
using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports.Playlist;
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
            IdVideos = playlist.IdVideos,
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

    public async Task AddVideoToPlayList(Guid idPlaylist, Guid idVideo)
    {
        var update = Builders<PlaylistEntity>.Update.Push(p => p.IdVideos, idVideo);
        var filter = Builders<PlaylistEntity>.Filter.Eq(p => p.Id, idPlaylist.AsObjectId());
        await EntityCollection.UpdateOneAsync(filter, update);

    }

    public async Task AddVideoToLiked(Guid idUser, Guid idVideo)
    {
        var playlist = await EntityCollection.AsQueryable().Where(p => p.User == idUser && p.Type == PlaylistType.Liked).FirstOrDefaultAsync();
        await AddVideoToPlayList(playlist.Id.AsGuid(), idVideo);
    }

    public async Task RemoveVideoFromPlaylist(Guid idPlaylist, Guid idVideo)
    {
        var update = Builders<PlaylistEntity>.Update.Pull(p => p.IdVideos, idVideo);
        var filter = Builders<PlaylistEntity>.Filter.Eq(p => p.Id, idPlaylist.AsObjectId());
        await EntityCollection.UpdateOneAsync(filter, update);
    }
    public async Task RemoveVideoFromLiked(Guid idUser, Guid idVideo)
    {
        var playlist = await EntityCollection.AsQueryable().Where(p => p.User == idUser && p.Type == PlaylistType.Liked).FirstOrDefaultAsync();
        await RemoveVideoFromPlaylist(playlist.Id.AsGuid(), idVideo);
    }

    public async Task<bool> IsOwner(Guid idUser, Guid idPlaylist)
    {
        return await EntityCollection.AsQueryable().AnyAsync(p => p.Id == idPlaylist.AsObjectId() && p.User == idUser);
    }
}