using System.ComponentModel.DataAnnotations;

namespace Example.Api.Abstractions.Transports
{
	public class Video : VideoBase
	{
		[Required] public required Guid Id { get; init; }
	}
}