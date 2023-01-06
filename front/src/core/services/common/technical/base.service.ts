import { AxiosResponse } from "axios";
import { injectable } from "inversify";

@injectable()
export class BaseService {
	protected unWrapAxios<T>(params: AxiosResponse<T>) {
		return params.data as T;
	}
}
