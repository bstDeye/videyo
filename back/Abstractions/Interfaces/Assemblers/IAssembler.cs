namespace Videyo.Api.Abstractions.Interfaces.Assemblers;

public interface IAssembler<TA, TB>
{
	TB Convert(TA obj);
	TA Convert(TB obj);

	IEnumerable<TB> Convert(IEnumerable<TA> objs);
	IEnumerable<TA> Convert(IEnumerable<TB> objs);

	Task<TB> Convert(Task<TA> obj);
	Task<TA> Convert(Task<TB> obj);
}