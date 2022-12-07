namespace Example.Api.Abstractions.Transports;

public class Origin
{
    public required Uri Url { get; init; }
    
    public required Application App { get; init; }
    
    public required List<string> Credits { get; init; }
    
}


public enum Application
{
    Tiktok,
    Instagram,
    Youtube

}