using System.ComponentModel.DataAnnotations;

namespace Example.Api.Abstractions.Transports
{
	public class Commentaire 
	{
		public required Guid Id { get; init; }
		
		public required  Guid AnsweredTo { get; set; }
		
		public required string Text { get; init; }

		public required string User { get; init; }
        
	}
}