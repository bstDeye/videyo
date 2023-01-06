import { injectable } from "inversify";

@injectable()
export class LocalStorageService {
	constructor(private base: string) {}

	set(value: number | string | object, key?: string) {
		let name = this.base;
		if (key !== undefined) name += " " + key;
		window.localStorage.setItem(name, JSON.stringify(value));
	}

	get<T>(key?: string): T | undefined {
		let name = this.base;
		if (key !== undefined) name += " " + key;
		const baseObj = window.localStorage.getItem(name);
		if (baseObj === null) return undefined;
		return JSON.parse(baseObj) as T;
	}

	remove(key?: string) {
		let name = this.base;
		if (key !== undefined) name += " " + key;
		window.localStorage.removeItem(name);
	}
}
