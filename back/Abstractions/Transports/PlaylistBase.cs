namespace Example.Api.Abstractions.Transports
{
    public abstract class PlaylistBase
    {
        public required string Label { get; init; }

        public required List<Guid> IdVideos { get; init; }

        public required string User { get; init; }
        
        public required Type Type { get; init; }
        
    }


    public enum Type
    {
        UserPlaylist,
        CategoryPlaylist
    }
}