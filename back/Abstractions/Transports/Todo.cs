using System.ComponentModel.DataAnnotations;

namespace Example.Api.Abstractions.Transports
{
	public class Todo : TodoBase
	{
		[Required] public required Guid Id { get; init; }
	}
}