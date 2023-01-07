using System.ComponentModel.DataAnnotations;

namespace Videyo.Api.Abstractions.Transports;

public class Video : VideoBase
{
    [Required] public required Guid Id { get; init; }
}