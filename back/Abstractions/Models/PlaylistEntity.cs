using Example.Api.Abstractions.Transports;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Example.Api.Abstractions.Models
{
	public class PlaylistEntity : PlaylistBase
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public ObjectId Id { get; init; }
	}
}