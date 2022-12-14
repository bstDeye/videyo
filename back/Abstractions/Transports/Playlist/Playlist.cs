using System.ComponentModel.DataAnnotations;

namespace Example.Api.Abstractions.Transports
{
	public class Playlist : PlaylistBase
	{
		[Required] public required Guid Id { get; init; }
	}
}