using Example.Api.Abstractions.Assemblers;
using Example.Api.Abstractions.Extensions;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;

namespace Example.Api.Core.Assemblers
{
	public class TodoAssembler : BaseAssembler<Todo, TodoEntity>
	{
		public override Todo Convert(TodoEntity obj)
		{
			return new Todo
			{
				Checked = obj.Checked,
				Id = obj.Id.AsGuid(),
				Label = obj.Label,
				User = obj.User
			};
		}

		public override TodoEntity Convert(Todo obj)
		{
			return new TodoEntity
			{
				Checked = obj.Checked,
				Id = obj.Id.AsObjectId(),
				Label = obj.Label,
				User = obj.User
			};
		}
	}
}