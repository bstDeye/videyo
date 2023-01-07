using Videyo.Api.Abstractions.Interfaces.Injections;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Videyo.Api.Adapters.AuthenticationApi;
using Videyo.Api.Adapters.Configs;

namespace Videyo.Api.Adapters.Injections;

public class AdapterModule : IDotnetModule
{
    public void Load(IServiceCollection services, IConfiguration configuration)
    {
        var conf = new EndpointConfig();
        configuration.GetSection(EndpointConfig.Section).Bind(conf);

        services.AddHttpClient<IAuthenticationClient, AuthenticationClient>(client => { client.BaseAddress = new Uri(conf.Authentication); });
    }
}