using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Videyo.Api.Abstractions.Interfaces.Injections;

public interface IDotnetModule
{
    /// <summary>
    ///     Chargement des enregistrements dans les services .Net Core.
    /// </summary>
    /// <param name="services">Collection des services de l'application</param>
    /// <param name="configuration">Configuration de l'application</param>
    void Load(IServiceCollection services, IConfiguration configuration);
}

public static class IDotnetModuleExtensions
{
    /// <summary>
    ///     Register an entire module .Net Core services.
    /// </summary>
    /// <typeparam name="TModule">Module type</typeparam>
    /// <param name="services">Application services</param>
    /// <param name="configuration">Application configuration</param>
    public static void AddModule<TModule>(this IServiceCollection services, IConfiguration configuration) where TModule : IDotnetModule, new()
    {
        var module = Activator.CreateInstance<TModule>();
        module.Load(services, configuration);
    }
}