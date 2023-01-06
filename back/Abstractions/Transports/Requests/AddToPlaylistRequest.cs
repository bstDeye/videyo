namespace Videyo.Api.Abstractions.Transports.Requests;

public record AddToPlaylistRequest(Guid IdVideo, Guid IdUser);

