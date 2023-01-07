import { createSlice } from "@reduxjs/toolkit";
import { User, Video } from "../../../core/apis/backend/generated";
import { getVideos } from "./video.async.actions";

export type UserState = {
	all: Record<Video["id"], Video>

};

const initialState: UserState = {
	all: {},
};

const slice = createSlice({
	name: "videos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getVideos.fulfilled, (state, action) => {
			for (const video of action.payload) {
				state.all[video.id] = video;
			}
		});

	},
});

export const videoReducer = slice.reducer;
