using Example.Api.Abstractions.Transports;
using Example.Api.Abstractions.Transports.Playlist;
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