import { BackendApi } from "../../apis/backend";
import { AuthenticationApiClient } from "../../apis/authentication";
import { Container } from "inversify";

export const addApis = (container: Container) => {
	container.bind(BackendApi).toSelf();
	container.bind<AuthenticationApiClient>(AuthenticationApiClient).toSelf();
};
