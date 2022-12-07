namespace Example.Api.Abstractions.Transports
{
    public abstract class VideoBase
    {
        public required string Label { get; init; }

        public required Origin Origin { get; init; }

        public required List<Commentaire> Commentaires { get; init; }

        public required string User { get; init; }
        
    }
}