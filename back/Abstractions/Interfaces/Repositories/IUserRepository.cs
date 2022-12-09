using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<UserEntity> Add(UserBase user);
        Task Like(Guid user, Guid idVideo);
        Task DisLike(Guid user, Guid idVideo);
        Task FollowPlaylist(Guid idUser, Guid idPlaylist);
        Task UnFollowPlaylist(Guid idUser, Guid idPlaylist);
    }
}