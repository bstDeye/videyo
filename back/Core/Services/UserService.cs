using Microsoft.Extensions.Logging;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Helpers;
using Videyo.Api.Abstractions.Interfaces.Repositories;
using Videyo.Api.Abstractions.Interfaces.Services;
using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Abstractions.Transports.Playlist;
using Videyo.Api.Core.Assemblers;

namespace Videyo.Api.Core.Services;

public class UserService : IUserService
{
    private readonly ILogger<UserService> _logger;
    private readonly UserAssembler _userAssembler = new();
    private readonly PlaylistAssembler _playlistAssembler = new();
    private readonly IUserRepository _userRepository;
    private readonly IPlaylistRepository _playlistRepository;

    public UserService(IUserRepository userRepository, ILogger<UserService> logger, IPlaylistRepository playlistRepository)
    {
        _userRepository = userRepository;
        this._logger = logger;
        _playlistRepository = playlistRepository;
    }

    public async Task<User> Add(string user)
    {
        var entity = await _userRepository.Get(user);

        if (entity != null) return _userAssembler.Convert(entity);

        entity = await _userRepository.Add(user);
        var created = await _playlistRepository.Create(new PlaylistBase
        {
            Label = "Created",
            IdVideos = new List<Guid>(),
            User = entity.Id.AsGuid(),
            Type = PlaylistType.Created
        });
        var liked = await _playlistRepository.Create(new PlaylistBase
        {
            Label = "Liked",
            IdVideos = new List<Guid>(),
            User = entity.Id.AsGuid(),
            Type = PlaylistType.Liked
        });

        entity = await _userRepository.InitDefaultPlaylist(user, _playlistAssembler.Convert(created), _playlistAssembler.Convert(liked));

        return _userAssembler.Convert(entity);
    }

    public async Task<List<User>> GetUsers()
    {
        var logger = _logger.Enter();

        var entities = await _userRepository.GetUsers();

        var users = _userAssembler.Convert(entities);
        
        logger.Exit();
        
        return users;
    }
}