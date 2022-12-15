using Example.Api.Abstractions.Transports.Playlist;

namespace Example.Api.Abstractions.Transports;

public class UserBase
{
    public required string Username { get; init; }
    /// <summary>
    /// Les playlistes suivies par cet utilisateur
    /// </summary>
    public required List<UserPlaylist> Playlists { get; init; }
        
    
}

