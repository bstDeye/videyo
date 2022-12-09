namespace Example.Api.Abstractions.Transports;

public class UserBase
{
    public required string Username { get; init; }
    /// <summary>
    /// Les playlistes suivies par cet utilisateur
    /// </summary>
    public required List<Guid> Playlists { get; init; }
        
    public required List<Guid> LikedVideos { get; init; }
    
}