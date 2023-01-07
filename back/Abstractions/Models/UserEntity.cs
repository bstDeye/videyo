using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Abstractions.Transports.User;

namespace Videyo.Api.Abstractions.Models;

public class UserEntity : UserBase
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; init; }
}