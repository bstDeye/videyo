namespace Example.Api.Abstractions.Transports.Playlist
{
    public abstract class PlaylistBase
    {
        public required string Label { get; init; }

        public required List<Guid> IdVideos { get; init; }

        public required Guid User { get; init; }
        
        public required PlaylistType Type { get; init; }
        
    }
    
}