using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Videyo.Api.Abstractions.Transports;

namespace Videyo.Api.Abstractions.Models;

public class VideoEntity : VideoBase
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; init; }
}