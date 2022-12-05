using Example.Api.Abstractions.Interfaces.Injections;
using Example.Api.Adapters.AuthenticationApi;
using Example.Api.Adapters.Configs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Example.Api.Adapters.Injections
{
	public class AdapterModule : IDotnetModule
	{
		public void Load(IServiceCollection services, IConfiguration configuration)
		{
			var conf = new EndpointConfig();
			configuration.GetSection(EndpointConfig.Section).Bind(conf);

			services.AddHttpClient<IUsersClient, UsersClient>(client => { client.BaseAddress = new Uri(conf.Authentication); });

			services.AddHttpClient<IAuthenticationClient, AuthenticationClient>(client => { client.BaseAddress = new Uri(conf.Authentication); });
		}
	}
}