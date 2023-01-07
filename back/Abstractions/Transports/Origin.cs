namespace Videyo.Api.Abstractions.Transports;

/**
 * Carte d'identité d'une vidéo avec : l'URL, l'application d'origine ainsi que les presonnes à créditer
 */
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