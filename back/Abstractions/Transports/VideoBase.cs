namespace Example.Api.Abstractions.Transports
{
    public class VideoBase
    {
        public required string Label { get; init; }
        public required Origin Origin { get; init; }
        public required List<Commentaire> Comments  { get; init; }
        public required Guid User { get; init; }
        public required int NbLikes { get; set; }

    }
}