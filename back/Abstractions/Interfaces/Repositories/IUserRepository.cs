using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;
using Example.Api.Abstractions.Transports.Playlist;

namespace Example.Api.Abstractions.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<UserEntity> Add(UserBase user);
        Task Like(Guid user);
        Task DisLike(Guid idUser);
        Task FollowPlaylist(Guid idUser, Playlist playlist);
        Task UnFollowPlaylist(Guid idUser, Guid idPlaylist);
    }
}