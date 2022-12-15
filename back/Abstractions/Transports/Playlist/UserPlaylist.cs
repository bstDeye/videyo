namespace Example.Api.Abstractions.Transports.Playlist;

public class UserPlaylist
{
    public required Guid Id { get; init;}
    
    public required string Label { get; set; }
    
    public required string Author { get; set; }
    
    public required int NbVideo { get; set; }
    
    public required PlaylistType Type { get; set; }
}

public enum PlaylistType
{
    Liked,
    Created,
    Custom
}