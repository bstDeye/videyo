using System.ComponentModel.DataAnnotations;

namespace Videyo.Api.Abstractions.Transports;

public class User : UserBase
{
    [Required] public required Guid Id { get; init; }
}