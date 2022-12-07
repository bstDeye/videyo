namespace Example.Api.Abstractions.Transports;

public class UserBase
{
    public required string Username { get; init; }
    
    public required List<Guid> Playlists { get; init; }
        
    public required List<Guid> LikedVideos { get; init; }
    
    public required List<Guid> SentComments { get; init; }
}