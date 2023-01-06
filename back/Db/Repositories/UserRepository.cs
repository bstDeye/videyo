using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Videyo.Api.Abstractions.Exceptions;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Interfaces.Repositories;
using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Abstractions.Transports.Playlist;
using Videyo.Api.Db.Repositories.Internal;

namespace Videyo.Api.Db.Repositories;

public class UserRepository : BaseRepository<UserEntity>, IUserRepository
{
    public UserRepository(IConfiguration configuration, ILogger<BaseRepository<UserEntity>> logger) : base(configuration, logger)
    {
    }


    public async Task<UserEntity> InitDefaultPlaylist(string user, Playlist created, Playlist liked)
    {
        var playlists = new List<Playlist>() { created, liked };
        var userPlaylists = playlists.Select(playlist => new UserPlaylist()
            { Author = user, Label = playlist.Label, NbVideo = 0, Type = playlist.Type, Id = playlist.Id }
        );

        var update = Builders<UserEntity>.Update.PushEach(u => u.Playlists, userPlaylists);

        return await EntityCollection.FindOneAndUpdateAsync(u => u.Username == user, update);
    }

    public async Task<UserEntity> Add(string user)
    {
        var entity = new UserEntity
        {
            Username = user,
            Playlists = new List<UserPlaylist>(),
        };
        try
        {
            await EntityCollection.InsertOneAsync(entity);
            return entity;
        }


        catch (MongoWriteException e)
        {
            if (e.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                throw new HttpException(HttpStatusCode.Conflict, $"Username {user} is already taken", e);
            }

            throw;
        }
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

    public async Task FollowPlaylist(Guid idUser, Playlist playlist)
    {
        var author = await EntityCollection.AsQueryable().FirstOrDefaultAsync(u => u.Id == playlist.User.AsObjectId());
        var userPlaylist = new UserPlaylist
        {
            Id = playlist.Id,
            Label = playlist.Label,
            Author = author.Username,
            NbVideo = playlist.IdVideos.Count,
            Type = PlaylistType.Custom
        };

        var update = Builders<UserEntity>.Update.Push(u => u.Playlists, userPlaylist);
        await EntityCollection.UpdateOneAsync(u => u.Id == idUser.AsObjectId(), update);
    }

    public async Task UnFollowPlaylist(Guid idUser, Guid idPlaylist)
    {
        //syntaxe mongoDb
        var update = Builders<UserEntity>.Update.PullFilter(u => u.Playlists, playlist => playlist.Id == idPlaylist);
        await EntityCollection.UpdateOneAsync(u => u.Id == idUser.AsObjectId(), update);
    }

    public Task<UserEntity?> Get(string username)
    {
        return EntityCollection.AsQueryable().Where(u => u.Username == username).FirstOrDefaultAsync();
    }

    public async Task<List<UserEntity>> GetUsers()
    {
        return await EntityCollection.AsQueryable().ToListAsync();
    }
}