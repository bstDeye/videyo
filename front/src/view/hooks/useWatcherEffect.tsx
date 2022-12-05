import { useEffect, useState } from "react";

type Callback<T> = (x?: any) => T;

export function useWatcherEffect<E = any, T = any>(obj: (event: E, callback: any) => void, event: E, watcher: Callback<T>, defaultValue: T) {
	const [data, setData] = useState<T>();

	useEffect(() => {
		obj(event, (x?: any) => {
			setData(watcher(x));
		});
	}, [event, watcher]);

	return { data: data ?? defaultValue };
}
