import { createAsyncThunk } from "@reduxjs/toolkit";
import store, { StoreState } from "../../index";
import { setTheme } from "../theme/theme.action";
import { toast } from "react-toastify";
import { container } from "../../../core/di";
import { AuthenticationEvents, AuthenticationService } from "../../../core/services/authentication.service";
import { LocalStorageService } from "../../../core/services/localStorage.service";
import { UserSettingsModelThemeEnum } from "../../../core/apis/authentication/generated";
import { DiKeysService } from "../../../core/di/services/di.keys.service";

const authentication = container.get(AuthenticationService);
const localStorages = {
	validation: container.get<LocalStorageService>(DiKeysService.localStorage.validation),
	settings: container.get<LocalStorageService>(DiKeysService.localStorage.settings),
};

function waitForLogin(page: Window) {
	return new Promise<void>(async (resolve) => {
		let interval: NodeJS.Timer | undefined;

		const clearInter = () => interval !== undefined && clearInterval(interval);
		page.onclose = clearInter;

		const func = () => {
			console.debug("Checking if user is logged from local storage");
			let isPresent = localStorages.validation.retrieve(undefined) !== undefined;
			if (isPresent) {
				localStorages.validation.remove();
				clearInter();
				resolve();
				return true;
			}

			return false;
		};

		if (!func()) {
			interval = setInterval(() => {
				func();
			}, 250);
		}
	});
}

export const login = createAsyncThunk("authentication/login", async (_, { getState, dispatch }) => {
	const { logged, username, settings } = (getState() as StoreState).authentication;
	if (!logged || username === undefined) {
		const toastId = toast.info("Connecting", { autoClose: false });
		const page = authentication.openLoginPage();
		if (page != null) {
			await waitForLogin(page);
			page.close();
			dispatch(getUserInfos());
			toast.update(toastId, {
				render: "Connected",
				autoClose: 5000,
				type: "success",
			});
		} else {
			throw new Error("An error occurred while opening the login page");
		}
	} else {
		console.info("You are already logged");
		return { username, settings };
	}
});

export const silentLogin = createAsyncThunk("authentication/silentLogin", async (_, { getState, dispatch }) => {
	const { logged, username, settings } = (getState() as StoreState).authentication;
	if (!logged || username === undefined) {
		if (await authentication.isLogged()) {
			dispatch(getUserInfos());
		}
	} else {
		console.info("You are already logged");
		return { username, settings };
	}
});

export const getUserInfos = createAsyncThunk("authentication/getUserInfos", async () => {
	const username = await authentication.getUsername();

	const [settings] = await Promise.all([authentication.getSettings(username)]);

	localStorages.settings.store(undefined, settings);

	AuthenticationEvents.emit("login", username);
	return { settings, username };
});

export const logout = createAsyncThunk("authentication/logout", async () => {
	await authentication.logout();
	AuthenticationEvents.emit("logout");
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
	const newColorScheme = e.matches ? "dark" : "light";
	const { settings } = store.getState().authentication;
	if (settings?.theme === UserSettingsModelThemeEnum.System) {
		store.dispatch(setTheme(newColorScheme));
	}
});
