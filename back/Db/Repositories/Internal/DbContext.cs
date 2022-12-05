using Example.Api.Db.Configs;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Example.Api.Db.Repositories.Internal
{
	public class MongoContext
	{
		public MongoContext(IConfiguration configuration)
		{
			var conf = new DbConfig();

			var connectionString = configuration["Database"];

			var url = new MongoUrl(connectionString);
			var client = new MongoClient(url);

			Console.WriteLine($"Connecting to Database '{url.DatabaseName}'");

			MongoDatabase = client.GetDatabase(url.DatabaseName);

			var pack = new ConventionPack
			{
				new EnumRepresentationConvention(BsonType.String)
			};
			ConventionRegistry.Register("EnumStringConvention", pack, _ => true);
			BsonSerializer.RegisterSerializationProvider(new EnumAsStringSerializationProvider());
		}

		/// <summary>
		///     Récupération de la IMongoDatabase
		/// </summary>
		/// <returns></returns>
		public IMongoDatabase MongoDatabase { get; }
	}
}