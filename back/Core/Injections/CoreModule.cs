using Example.Api.Abstractions.Interfaces.Injections;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Example.Api.Core.Injections
{
	public class CoreModule : IDotnetModule
	{
		public void Load(IServiceCollection services, IConfiguration configuration)
		{
			var nsp = typeof(CoreModule).Namespace!;
			var baseNamespace = nsp[..nsp.LastIndexOf(".")];
			services.Scan(scan => scan
				.FromAssemblyOf<CoreModule>()
				.AddClasses(classes => classes.InNamespaces(baseNamespace + ".Services"))
				.AsImplementedInterfaces()
				.WithSingletonLifetime()
			);
		}
	}
}