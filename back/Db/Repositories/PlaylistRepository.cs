using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;
using Example.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Example.Api.Db.Repositories;

public class PlaylistRepository :BaseRepository<PlaylistEntity>, IPlaylistRepository
{
    
    public PlaylistRepository(IConfiguration configuration, ILogger<BaseRepository<PlaylistEntity>> logger) : base(configuration, logger)
    {
    }
    public async Task<PlaylistEntity> Add(PlaylistBase playlist)
    {
        var entity = new PlaylistEntity
        {
            Label = playlist.Label,
            IdVideos = playlist.IdVideos,
            User = playlist.User,
        };

        await EntityCollection.InsertOneAsync(entity);
        return entity;

    }

    public async Task<List<PlaylistEntity>> GetAll()
    {
        throw new NotImplementedException();
    }

    public async Task AddVideoToPlayList(Guid idVideo, Guid idPlaylist, Guid idUser)
    {
        throw new NotImplementedException();
    }

    public async Task RemoveVideoFromPlaylist(Guid idVideo, Guid idPlaylist, Guid idUser)
    {
        throw new NotImplementedException();
    }


}