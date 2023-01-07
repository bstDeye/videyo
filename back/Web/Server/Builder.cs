using System.Net;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Newtonsoft.Json.Converters;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using Videyo.Api.Abstractions.Helpers;
using Videyo.Api.Abstractions.Interfaces.Injections;
using Videyo.Api.Adapters.Injections;
using Videyo.Api.Core.Injections;
using Videyo.Api.Db.Injections;
using Videyo.Api.Web.Filters;
using Videyo.Api.Web.Processors;
using Videyo.Api.Web.Utils;

namespace Videyo.Api.Web.Server;

public class ServerBuilder
{
    private readonly string frontPath = Env.Get("FRONT_PATH", "/front");

    public ServerBuilder(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.WebHost.ConfigureKestrel((_, options) =>
            {
                options.Listen(IPAddress.Any, 4000, listenOptions =>
                    {
                        // Use HTTP/3
                        listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                    }
                );
            }
        );


        // Setup CORS
        builder.Services.AddCors(options =>
            {
                options.AddPolicy("Cors", b =>
                    {
                        b.AllowAnyOrigin();
                        b.AllowAnyHeader();
                        b.AllowAnyMethod();
                    }
                );

                options.DefaultPolicyName = "Cors";
            }
        );


        builder.Services.AddModule<AdapterModule>(builder.Configuration);
        builder.Services.AddModule<CoreModule>(builder.Configuration);
        builder.Services.AddModule<DatabaseModule>(builder.Configuration);


        // Setup Logging
        builder.Host.UseSerilog((_, lc) => lc
            .MinimumLevel.Debug()
            .Filter.ByExcluding(e => e.Level == LogEventLevel.Debug && e.Properties["SourceContext"].ToString().Contains("Microsoft"))
            .Enrich.FromLogContext()
            .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level} {SourceContext:l}] {Message:lj}{NewLine}{Exception}",
                theme: AnsiConsoleTheme.Sixteen)
        );

        // Convert Enum to String 
        builder.Services.AddControllers(o =>
                {
                    o.Conventions.Add(new ControllerDocumentationConvention());
                    o.OutputFormatters.RemoveType<StringOutputFormatter>();
                    o.Filters.Add<Machin>();
                }
            )
            .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))
            .AddNewtonsoftJson(x => x.SerializerSettings.Converters.Add(new StringEnumConverter()));

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApiDocument(document =>
        {
            document.DocumentName = "Example.Api";
            document.Title = "Example.Api";

            document.SchemaProcessors.Add(new NullableSchemaProcessor());
            document.OperationProcessors.Add(new NullableOperationProcessor());
        });
        // Setup SPA Serving
        if (builder.Environment.IsProduction()) Console.WriteLine($"Server in production, serving SPA from {frontPath} folder");

        Application = builder.Build();
    }

    public WebApplication Application { get; }
}