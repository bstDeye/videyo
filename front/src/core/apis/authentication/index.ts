import { injectable } from "inversify";
import { AuthenticationApi as baseAuth, UsersApi, UsersSettingsApi } from "./generated";
import axios from "axios";

const instance = axios.create({
	withCredentials: true,
});

@injectable()
export class AuthenticationApiClient {
	public readonly clients = {
		login: new baseAuth(undefined, window.config.endpoints.authentication, instance),
		user: new UsersApi(undefined, window.config.endpoints.authentication, instance),
		settings: new UsersSettingsApi(undefined, window.config.endpoints.authentication, instance),
	};
}
