using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Videyo.Api.Abstractions.Interfaces.Injections;

namespace Videyo.Api.Db.Injections;

public class DatabaseModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var nsp = typeof(DatabaseModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf(".")];
		services.Scan(scan => scan
			.FromAssemblyOf<DatabaseModule>()
			.AddClasses(classes => classes.InNamespaces(baseNamespace + ".Repositories"))
			.AsImplementedInterfaces()
			.WithSingletonLifetime()
		);
	}
}