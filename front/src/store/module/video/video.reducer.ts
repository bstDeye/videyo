import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../core/apis/backend/generated";

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

	},
});

export const videoReducer = slice.reducer;
