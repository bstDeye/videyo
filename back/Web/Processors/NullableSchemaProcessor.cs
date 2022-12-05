using NJsonSchema;
using NJsonSchema.Generation;

namespace Example.Api.Web.Processors
{
	/// <inheritdoc />
	public class NullableSchemaProcessor : ISchemaProcessor
	{
		/// <summary>
		///     Permet d'indiquer dans le schéma OpenApi que les champs non-Nullables notamment certaines string sont required
		///     (sans avoir besoin de l'annotation)
		/// </summary>
		/// <param name="context"></param>
		/// <returns></returns>
		/// <inheritdoc />
		public void Process(SchemaProcessorContext context)
		{
			foreach (var (_, prop) in context.Schema.Properties)
			{
				var nullable = prop.IsNullable(SchemaType.OpenApi3);
				prop.IsRequired = !nullable;
				prop.IsNullableRaw = nullable;
			}
		}
	}
}