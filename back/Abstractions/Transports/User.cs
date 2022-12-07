using System.ComponentModel.DataAnnotations;

namespace Example.Api.Abstractions.Transports;

public class User : UserBase
{
    [Required] public required Guid Id { get; init; }
}