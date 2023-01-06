import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../core/apis/backend/generated";
import { getUsers } from "./user.async.actions";

export type UserState = {
	all: Record<User["username"], User>

};

const initialState: UserState = {
	all: {},
};

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUsers.fulfilled, (state, action) => {
				for (let user of action.payload) {
					state.all[user.username] = user;
				}
			}
		)

	},
});

export const userReducer = slice.reducer;
