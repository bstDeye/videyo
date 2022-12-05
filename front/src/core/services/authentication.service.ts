import { openPage } from "../utils/web";
import { inject, injectable } from "inversify";
import { ThemeService } from "./theme.service";
import { AuthenticationApiClient } from "../apis/authentication";
import { EventManager } from "../utils/event";
import { BaseService } from "./base.service";

@injectable()
export class AuthenticationService extends BaseService {
	@inject(ThemeService)
	private themeService!: ThemeService;

	@inject(AuthenticationApiClient)
	private authenticationApi!: AuthenticationApiClient;

	public openLoginPage() {
		return openPage(`${window.config.endpoints.authentication}/login`);
	}

	public getUsername() {
		return this.authenticationApi.clients.user.getUserInfo("username").then(super.unWrapAxios);
	}

	public getToken() {
		return this.authenticationApi.clients.user.getUserInfo("token").then(super.unWrapAxios);
	}

	public getCredentials(username: string) {
		return this.authenticationApi.clients.user.getUserInfo("username").then(super.unWrapAxios);
	}

	public getSettings(username: string) {
		return this.authenticationApi.clients.settings.get(username).then(super.unWrapAxios);
	}

	public async getUserTheme(username: string) {
		let theme = await this.themeService.getThemeFromSystem();
		return this.authenticationApi.clients.settings.getTheme(username, theme).then(super.unWrapAxios);
	}

	public isLogged() {
		return this.authenticationApi.clients.login.validToken().then(super.unWrapAxios);
	}

	public async logout() {
		await this.authenticationApi.clients.login.logout();
	}
}

export const AuthenticationEvents = new EventManager<{
	login: (username: string) => void;
	logout: () => void;
}>();
