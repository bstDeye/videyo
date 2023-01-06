using System.Reflection;
using NSwag.Generation.Processors;
using NSwag.Generation.Processors.Contexts;

namespace Videyo.Api.Web.Processors;

public class NullableOperationProcessor : IOperationProcessor
{
	private static readonly NullabilityInfoContext context = new();

	/// <summary>
	///     Permet d'indiquer dans le schéma OpenApi que les champs non-Nullables notamment certaines string sont required
	///     (sans avoir besoin de l'annotation)
	/// </summary>
	/// <param name="context"></param>
	/// <returns></returns>
	public bool Process(OperationProcessorContext context)
	{
		context.OperationDescription.Operation.OperationId = context.MethodInfo.Name;

		foreach (var (param, prop) in context.Parameters)
		{
			var nullable = IsNullable(param);
			prop.IsRequired = !nullable;
			prop.Schema.IsNullableRaw = nullable;
		}

		return true;
	}


	private static bool IsNullable(ParameterInfo p)
	{
		var nullabilityInfo = context.Create(p);
		return nullabilityInfo.WriteState is NullabilityState.Nullable;
	}
}