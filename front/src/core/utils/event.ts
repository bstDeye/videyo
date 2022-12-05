import { EventEmitter } from "events";

type Event = {
	[key in string]: (...args: any) => void;
};

export class EventManager<T extends Event = {}> {
	private base = new EventEmitter();

	public on<event extends keyof T>(evt: event, callback: T[event]) {
		this.base.on(evt as string, callback);
	}

	public emit<event extends keyof T>(evt: event, ...params: Parameters<T[event]>) {
		console.log("EventManager emit", evt);
		this.base.emit(evt as string, params);
	}
}
