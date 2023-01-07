using Videyo.Api.Abstractions.Transports.User;

namespace Videyo.Api.Abstractions.Transports.Playlist;

public class PlaylistBase
{
    public required string Label { get; init; }

    public required List<PlaylistVideo> Videos { get; init; }

    public required PlaylistUser User { get; init; }
        
    public required PlaylistType Type { get; init; }
        
}