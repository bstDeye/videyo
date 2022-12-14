using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;
using Example.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Example.Api.Db.Repositories;

public class UserRepository : BaseRepository<UserEntity>,IUserRepository
{
    public UserRepository(IConfiguration configuration, ILogger<BaseRepository<UserEntity>> logger) : base(configuration, logger)
    {
    }
    public async Task<UserEntity> Add(UserBase user)
    {
        throw new NotImplementedException();
    }

    public async Task Like(Guid user, Guid idVideo)
    {
        throw new NotImplementedException();
    }

    public async Task DisLike(Guid user, Guid idVideo)
    {
        throw new NotImplementedException();
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