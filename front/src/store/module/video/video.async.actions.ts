import { createAsyncThunk } from "@reduxjs/toolkit";
import { VideoBase } from "../../../core/apis/backend/generated";
import { StoreState } from "../../index";
import { getService } from "../../common/common.actions";
import { VideoService } from "../../../core/services/video.service";




export const getVideos = createAsyncThunk("video/getVideos", async (_, {extra}) => {
	const service = getService(VideoService, extra);

	return service.getVideos();
})

export const addVideo = createAsyncThunk("video/addVideo", async (video: VideoBase, { getState, extra }) => {
	const store = getState() as StoreState;
	const service = getService(VideoService, extra);

	const user = store.user.all[store.authentication.user!.username];
	await service.add(user.id, video);
});





