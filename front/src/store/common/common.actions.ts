import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { silentLogin } from "../module/authentication/authentication.async.action";
import { ExtraArgument } from "../index";
import { AuthenticationEvents } from "../../core/services/common/auth/authentication.service";
import { createUnknownUser, getUsers } from "../module/user/user.async.actions";

export const initApp = createAsyncThunk("initApp", (_, { dispatch }) => {
	dispatch(getUsers());
	dispatch(silentLogin());
	AuthenticationEvents.on("login", ()=> {
		dispatch(createUnknownUser());
	})
});

type Constructor<T> = new (...args: any[]) => T;

export function getService<T>(service: Constructor<T>, extra): T {
	const { container } = extra as ExtraArgument;
	return container.get(service);
}

export function createActionBase(base: string) {
	return <T = void>(suffix: string) => createAction<T>(`${base}/${suffix}`);
}
