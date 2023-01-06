import { createReducer } from "@reduxjs/toolkit";
import { setUserFromToken } from "./authentication.action";
import { Settings, User } from "../../../core/apis/authentication/generated";
import { logout } from "./authentication.async.action";

export interface AuthenticationState {
	logged: boolean;
	user?: User;
	settings?: Settings;
}

const defaultState: AuthenticationState = {
	logged: false,
};

export const authenticationReducer = createReducer(defaultState, (builder) => {
	builder.addCase(setUserFromToken, (state, action) => {
		state.logged = true;
		state.user = action.payload;
	});

	builder.addCase(logout.fulfilled, (state) => {
		state.logged = defaultState.logged;
		state.user = undefined;
	});
});
