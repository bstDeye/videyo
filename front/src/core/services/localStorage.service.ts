import { injectable } from "inversify";

@injectable()
export class LocalStorageService {
	constructor(private base: string) {
	}

	store(key: string | undefined, value: number | string | object) {
		let name = this.base;
		if (key !== undefined) name += " " + key;
		window.localStorage.setItem(name, JSON.stringify(value));
	}

	retrieve<T>(key?: string): T | undefined {
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
