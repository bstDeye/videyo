using System.ComponentModel.DataAnnotations;

namespace Videyo.Api.Abstractions.Transports.Playlist;

public class Playlist : PlaylistBase
{
    [Required] public required Guid Id { get; init; }
}