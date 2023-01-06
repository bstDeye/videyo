using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Abstractions.Transports.Playlist;

namespace Videyo.Api.Abstractions.Interfaces.Repositories;

public interface IUserRepository
{

    Task<UserEntity> InitDefaultPlaylist(string user, Playlist created, Playlist liked);
        
    Task<UserEntity> Add(string user);
    Task Like(Guid user);
    Task DisLike(Guid idUser);
    Task FollowPlaylist(Guid idUser, Playlist playlist);
    Task UnFollowPlaylist(Guid idUser, Guid idPlaylist);
    Task<UserEntity?> Get(string username);

    Task<List<UserEntity>> GetUsers();
}