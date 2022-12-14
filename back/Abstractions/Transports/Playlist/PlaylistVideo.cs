using System.Runtime.InteropServices.JavaScript;

namespace Example.Api.Abstractions.Transports;

public class PlaylistVideo
{
    public required Guid Id { get; init;}
    
    public required string Label { get; set; }
    
    public required string UserId { get; set; }
    
}