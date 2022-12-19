using System.ComponentModel.DataAnnotations;

namespace Example.Api.Abstractions.Transports.Playlist
{
	public class Playlist : PlaylistBase
	{
		[Required] public required Guid Id { get; init; }
		
		
		
		
	}
	
	
}