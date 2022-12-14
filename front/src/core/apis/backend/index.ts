import { injectable } from "inversify";
import { TodoClient, TodoUserClient } from "./generated";


const fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response> = (url, init) => {
	return window.fetch(url, {
		...init,
		credentials: "include",
	});
};

@injectable()
export class BackendApi {


	public readonly todo = {
		common: new TodoClient(window.config.endpoints.core),
		user: new TodoUserClient(window.config.endpoints.core),
	};

	// public readonly video = {
	// 	common:
	// }
}
