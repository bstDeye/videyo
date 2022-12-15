using Example.Api.Abstractions.Extensions;
using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;
using Example.Api.Abstractions.Transports.Playlist;
using Example.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Example.Api.Db.Repositories;

public class UserRepository : BaseRepository<UserEntity>,IUserRepository
{
    public UserRepository(IConfiguration configuration, ILogger<BaseRepository<UserEntity>> logger) : base(configuration, logger)
    {
    }
    public async Task<UserEntity> Add(UserBase user)
    {
        var entity = new UserEntity
        {
            Username = user.Username,
            Playlists = user.Playlists,
        };

        await EntityCollection.InsertOneAsync(entity);
        return entity;
    }

    public async Task Like(Guid idUser)
    {
        var user = await EntityCollection.AsQueryable().Where(user => user.Id == idUser.AsObjectId()).FirstOrDefaultAsync();
        var playlist = user.Playlists.Find(playlist => playlist.Type == PlaylistType.Liked);
        playlist.NbVideo += 1;
        await EntityCollection.ReplaceOneAsync(v => v.Id == user.Id, user);
    }

    public async Task DisLike(Guid idUser)
    {
        var user = await EntityCollection.AsQueryable().Where(user => user.Id == idUser.AsObjectId()).FirstOrDefaultAsync();
        var playlist = user.Playlists.Find(playlist => playlist.Type == PlaylistType.Liked);
        playlist.NbVideo -= 1;
        await EntityCollection.ReplaceOneAsync(v => v.Id == user.Id, user);
    }

    public async Task FollowPlaylist(Guid idUser, Guid idPlaylist)
    {
        throw new NotImplementedException();
    }

    public async Task UnFollowPlaylist(Guid idUser, Guid idPlaylist)
    {
        throw new NotImplementedException();
    }

   
}