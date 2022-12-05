using Example.Api.Abstractions.Interfaces.Repositories;
using Example.Api.Abstractions.Interfaces.Services;
using Example.Api.Abstractions.Transports;
using Example.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;

namespace Example.Api.Core.Services
{
	public class TodoService : ITodoService
	{
		private readonly string defaultUser = "public";
		private readonly ILogger<TodoService> logger;
		private readonly TodoAssembler todoAssembler = new();
		private readonly ITodoRepository todoRepository;

		public TodoService(ITodoRepository todoRepository, ILogger<TodoService> logger)
		{
			this.todoRepository = todoRepository;
			this.logger = logger;
		}

		public async Task<Todo> Add(string label)
		{
			var obj = await todoRepository.Add(label, defaultUser);
			return todoAssembler.Convert(obj);
		}

		public async Task<Todo> AddForUser(string label, string user)
		{
			var obj = await todoRepository.Add(label, user);
			return todoAssembler.Convert(obj);
		}

		public async Task<List<Todo>> GetAllForUser(string user)
		{
			var obj = await todoRepository.GetAll(user);
			return todoAssembler.Convert(obj);
		}

		public async Task<List<Todo>> GetAll()
		{
			var obj = await todoRepository.GetAll(defaultUser);
			return todoAssembler.Convert(obj);
		}

		public async Task<Todo> Check(Guid id)
		{
			var obj = await todoRepository.Check(id, defaultUser);
			return todoAssembler.Convert(obj);
		}

		public async Task<Todo> CheckForUser(Guid id, string user)
		{
			var obj = await todoRepository.Check(id, user);
			return todoAssembler.Convert(obj);
		}

		public async Task Delete(Guid id)
		{
			await todoRepository.Delete(id, defaultUser);
		}

		public async Task DeleteForUser(Guid id, string user)
		{
			await todoRepository.Delete(id, defaultUser);
		}
	}
}