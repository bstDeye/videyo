namespace Videyo.Api.Abstractions.Transports.User;

public class UserBase
{
    public required string Username { get; init; }

    /// <summary>
    /// Les playlistes suivies par cet utilisateur
    /// </summary>
    public required List<UserPlaylist> Playlists { get; set; }
}