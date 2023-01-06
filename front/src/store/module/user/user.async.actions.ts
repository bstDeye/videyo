import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../../index";
import { getService } from "../../common/common.actions";
import { UserService } from "../../../core/services/user.service";


export const createUnknownUser = createAsyncThunk("user/createUnknownUser", async (_, { getState, extra }) => {
	const store = getState() as StoreState;
	const service = getService(UserService, extra);
	const username = store.authentication.user!.username;
	await service.add(username);
});

export const getUsers = createAsyncThunk("user/getUsers", async (_, {  extra }) => {
	const service = getService(UserService, extra);

	return service.getUsers();
});