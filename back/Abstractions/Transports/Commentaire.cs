using System.ComponentModel.DataAnnotations;

namespace Videyo.Api.Abstractions.Transports;

public class Commentaire 
{
	public required Guid Id { get; init; }
		
	public required  Guid AnsweredTo { get; set; }
		
	public required string Text { get; set; }

	public required string User { get; init; }
        
}