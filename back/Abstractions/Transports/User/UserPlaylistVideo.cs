namespace Videyo.Api.Abstractions.Transports.User;

public class UserPlaylistVideo
{
    public required Guid Id { get; init; }

    public required string Label { get; set; }
}