import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { TodoClient } from "../apis/backend/generated";
import { BaseService } from "./common/technical/base.service";


interface ITodoServiceSub {
	get: TodoClient["getAll"];
	add: TodoClient["add"];
	remove: TodoClient["delete"];
	check: TodoClient["check"];
}

@injectable()
export class TodoService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	public common: ITodoServiceSub = {
		get: async (cancelToken) => {
			return await this.backendApiClient.todo.common.getAll(cancelToken);
		},
		add: async (label) => {
			return await this.backendApiClient.todo.common.add(label);
		},
		check: async (id) => {
			return await this.backendApiClient.todo.common.check(id);
		},
		remove: async (id) => {
			await this.backendApiClient.todo.common.delete(id);
		},
	};

	public user: ITodoServiceSub = {
		get: async (cancelToken) => {
			return await this.backendApiClient.todo.user.getAllForUser(cancelToken);
		},
		add: async (label) => {
			return await this.backendApiClient.todo.user.addForUser(label);
		},
		check: async (id) => {
			return await this.backendApiClient.todo.user.checkForUser(id);
		},
		remove: async (id) => {
			await this.backendApiClient.todo.user.deleteForUser(id);
		},
	};
}
