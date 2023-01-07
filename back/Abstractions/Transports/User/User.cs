using System.ComponentModel.DataAnnotations;

namespace Videyo.Api.Abstractions.Transports.User;

public class User : UserBase
{
    [Required] public required Guid Id { get; init; }
}