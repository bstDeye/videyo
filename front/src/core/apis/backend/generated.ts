//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */

// ReSharper disable InconsistentNaming

export class TodoClient {
	protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
	private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
	private baseUrl: string;

	constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
		this.http = http ? http : window as any;
		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";
	}

	getAll(signal?: AbortSignal | undefined): Promise<Todo[]> {
		let url_ = this.baseUrl + "/api/todo";
		url_ = url_.replace(/[?&]$/, "");

		let options_: RequestInit = {
			method: "GET",
			signal,
			headers: {
				"Accept": "application/json",
			},
		};

		return this.http.fetch(url_, options_).then((_response: Response) => {
			return this.processGetAll(_response);
		});
	}

	add(label: string, signal?: AbortSignal | undefined): Promise<Todo> {
		let url_ = this.baseUrl + "/api/todo";
		url_ = url_.replace(/[?&]$/, "");

		const content_ = JSON.stringify(label);

		let options_: RequestInit = {
			body: content_,
			method: "POST",
			signal,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
		};

		return this.http.fetch(url_, options_).then((_response: Response) => {
			return this.processAdd(_response);
		});
	}

	check(id: string, signal?: AbortSignal | undefined): Promise<Todo> {
		let url_ = this.baseUrl + "/api/todo/{id}/toggle";
		if (id === undefined || id === null)
			throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_: RequestInit = {
			method: "PUT",
			signal,
			headers: {
				"Accept": "application/json",
			},
		};

		return this.http.fetch(url_, options_).then((_response: Response) => {
			return this.processCheck(_response);
		});
	}

	delete(id: string, signal?: AbortSignal | undefined): Promise<void> {
		let url_ = this.baseUrl + "/api/todo/{id}";
		if (id === undefined || id === null)
			throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_: RequestInit = {
			method: "DELETE",
			signal,
			headers: {},
		};

		return this.http.fetch(url_, options_).then((_response: Response) => {
			return this.processDelete(_response);
		});
	}

	protected processGetAll(response: Response): Promise<Todo[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && response.headers.forEach) {
			response.headers.forEach((v: any, k: any) => _headers[k] = v);
		}

		if (status === 200) {
			return response.text().then((_responseText) => {
				let result200: any = null;
				result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as Todo[];
				return result200;
			});
		} else if (status !== 200 && status !== 204) {
			return response.text().then((_responseText) => {
				return throwException("An unexpected server error occurred.", status, _responseText, _headers);
			});
		}
		return Promise.resolve<Todo[]>(null as any);
	}

	protected processAdd(response: Response): Promise<Todo> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && response.headers.forEach) {
			response.headers.forEach((v: any, k: any) => _headers[k] = v);
		}

		if (status === 200) {
			return response.text().then((_responseText) => {
				let result200: any = null;
				result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as Todo;
				return result200;
			});
		} else if (status === 401) {
			return response.text().then((_responseText) => {
				return throwException("Unauthorized", status, _responseText, _headers);
			});
		} else if (status === 403) {
			return response.text().then((_responseText) => {
				return throwException("Forbidden", status, _responseText, _headers);
			});
		} else if (status !== 200 && status !== 204) {
			return response.text().then((_responseText) => {
				return throwException("An unexpected server error occurred.", status, _responseText, _headers);
			});
		}
		return Promise.resolve<Todo>(null as any);
	}

	protected processCheck(response: Response): Promise<Todo> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && response.headers.forEach) {
			response.headers.forEach((v: any, k: any) => _headers[k] = v);
		}

		if (status === 200) {
			return response.text().then((_responseText) => {
				let result200: any = null;
				result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as Todo;
				return result200;
			});
		} else if (status !== 200 && status !== 204) {
			return response.text().then((_responseText) => {
				return throwException("An unexpected server error occurred.", status, _responseText, _headers);
			});
		}
		return Promise.resolve<Todo>(null as any);
	}

	protected processDelete(response: Response): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && response.headers.forEach) {
			response.headers.forEach((v: any, k: any) => _headers[k] = v);
		}

		if (status === 204) {
			return response.text().then((_responseText) => {
				return;
			});
		} else if (status === 401) {
			return response.text().then((_responseText) => {
				return throwException("Unauthorized", status, _responseText, _headers);
			});
		} else if (status === 403) {
			return response.text().then((_responseText) => {
				return throwException("Forbidden", status, _responseText, _headers);
			});
		} else if (status !== 200 && status !== 204) {
			return response.text().then((_responseText) => {
				return throwException("An unexpected server error occurred.", status, _responseText, _headers);
			});
		}
		return Promise.resolve<void>(null as any);
	}
}

export class TodoUserClient {
	protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
	private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
	private baseUrl: string;

	constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
		this.http = http ? http : window as any;
		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";
	}

	deleteForUser(id: string, signal?: AbortSignal | undefined): Promise<void> {
		let url_ = this.baseUrl + "/api/todo/user/{id}";
		if (id === undefined || id === null)
			throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_: RequestInit = {
			method: "DELETE",
			signal,
			headers: {},
		};

		return this.http.fetch(url_, options_).then((_response: Response) => {
			return this.processDeleteForUser(_response);
		});
	}

	addForUser(label: string, signal?: AbortSignal | undefined): Promise<Todo> {
		let url_ = this.baseUrl + "/api/todo/user";
		url_ = url_.replace(/[?&]$/, "");

		const content_ = JSON.stringify(label);

		let options_: RequestInit = {
			body: content_,
			method: "POST",
			signal,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
		};

		return this.http.fetch(url_, options_).then((_response: Response) => {
			return this.processAddForUser(_response);
		});
	}

	getAllForUser(signal?: AbortSignal | undefined): Promise<Todo[]> {
		let url_ = this.baseUrl + "/api/todo/user";
		url_ = url_.replace(/[?&]$/, "");

		let options_: RequestInit = {
			method: "GET",
			signal,
			headers: {
				"Accept": "application/json",
			},
		};

		return this.http.fetch(url_, options_).then((_response: Response) => {
			return this.processGetAllForUser(_response);
		});
	}

	checkForUser(id: string, signal?: AbortSignal | undefined): Promise<Todo> {
		let url_ = this.baseUrl + "/api/todo/user/{id}/toggle";
		if (id === undefined || id === null)
			throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_: RequestInit = {
			method: "PUT",
			signal,
			headers: {
				"Accept": "application/json",
			},
		};

		return this.http.fetch(url_, options_).then((_response: Response) => {
			return this.processCheckForUser(_response);
		});
	}

	protected processDeleteForUser(response: Response): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && response.headers.forEach) {
			response.headers.forEach((v: any, k: any) => _headers[k] = v);
		}

		if (status === 204) {
			return response.text().then((_responseText) => {
				return;
			});
		} else if (status === 401) {
			return response.text().then((_responseText) => {
				return throwException("Unauthorized", status, _responseText, _headers);
			});
		} else if (status === 403) {
			return response.text().then((_responseText) => {
				return throwException("Forbidden", status, _responseText, _headers);
			});
		} else if (status !== 200 && status !== 204) {
			return response.text().then((_responseText) => {
				return throwException("An unexpected server error occurred.", status, _responseText, _headers);
			});
		}
		return Promise.resolve<void>(null as any);
	}

	protected processAddForUser(response: Response): Promise<Todo> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && response.headers.forEach) {
			response.headers.forEach((v: any, k: any) => _headers[k] = v);
		}

		if (status === 201) {
			return response.text().then((_responseText) => {
				let result201: any = null;
				result201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as Todo;
				return result201;
			});
		} else if (status === 401) {
			return response.text().then((_responseText) => {
				return throwException("Unauthorized", status, _responseText, _headers);
			});
		} else if (status === 403) {
			return response.text().then((_responseText) => {
				return throwException("Forbidden", status, _responseText, _headers);
			});
		} else if (status !== 200 && status !== 204) {
			return response.text().then((_responseText) => {
				return throwException("An unexpected server error occurred.", status, _responseText, _headers);
			});
		}
		return Promise.resolve<Todo>(null as any);
	}

	protected processGetAllForUser(response: Response): Promise<Todo[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && response.headers.forEach) {
			response.headers.forEach((v: any, k: any) => _headers[k] = v);
		}

		if (status === 200) {
			return response.text().then((_responseText) => {
				let result200: any = null;
				result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as Todo[];
				return result200;
			});
		} else if (status === 401) {
			return response.text().then((_responseText) => {
				return throwException("Unauthorized", status, _responseText, _headers);
			});
		} else if (status === 403) {
			return response.text().then((_responseText) => {
				return throwException("Forbidden", status, _responseText, _headers);
			});
		} else if (status !== 200 && status !== 204) {
			return response.text().then((_responseText) => {
				return throwException("An unexpected server error occurred.", status, _responseText, _headers);
			});
		}
		return Promise.resolve<Todo[]>(null as any);
	}

	protected processCheckForUser(response: Response): Promise<Todo> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && response.headers.forEach) {
			response.headers.forEach((v: any, k: any) => _headers[k] = v);
		}

		if (status === 200) {
			return response.text().then((_responseText) => {
				let result200: any = null;
				result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as Todo;
				return result200;
			});
		} else if (status === 401) {
			return response.text().then((_responseText) => {
				return throwException("Unauthorized", status, _responseText, _headers);
			});
		} else if (status === 403) {
			return response.text().then((_responseText) => {
				return throwException("Forbidden", status, _responseText, _headers);
			});
		} else if (status !== 200 && status !== 204) {
			return response.text().then((_responseText) => {
				return throwException("An unexpected server error occurred.", status, _responseText, _headers);
			});
		}
		return Promise.resolve<Todo>(null as any);
	}
}

export interface TodoBase {
	label: string;
	user: string;
	checked: boolean;
}

export interface Todo extends TodoBase {
	id: string;
}

export class ApiException extends Error {
	override message: string;
	status: number;
	response: string;
	headers: { [key: string]: any; };
	result: any;
	protected isApiException = true;

	constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
		super();

		this.message = message;
		this.status = status;
		this.response = response;
		this.headers = headers;
		this.result = result;
	}

	static isApiException(obj: any): obj is ApiException {
		return obj.isApiException === true;
	}
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
	if (result !== null && result !== undefined)
		throw result;
	else
		throw new ApiException(message, status, response, headers, null);
}