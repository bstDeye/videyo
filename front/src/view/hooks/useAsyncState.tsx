import { useEffect, useState } from "react";

type UseAsyncStateParams<T> = () => Promise<T>;

export function useAsyncState<T>(func: UseAsyncStateParams<T>, defaultValue: T, replay?: number) {
	const [data, setData] = useState<T>(defaultValue);

	const handle = async (func: UseAsyncStateParams<T>) => {
		const out = await func();
		setData(out);
	};

	useEffect(() => {
		handle(func);
		let timer: NodeJS.Timer | undefined;
		if (replay) {
			timer = setInterval(() => {
				handle(func);
			}, replay);
		}

		return () => {
			timer && clearInterval(timer);
		};
	}, [func]);

	return {
		data: data,
		reload: () => handle(func),
	};
}
