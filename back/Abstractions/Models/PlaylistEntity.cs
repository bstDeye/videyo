using Videyo.Api.Abstractions.Transports;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Videyo.Api.Abstractions.Transports.Playlist;

namespace Videyo.Api.Abstractions.Models;

public class PlaylistEntity : PlaylistBase
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; init; }
}