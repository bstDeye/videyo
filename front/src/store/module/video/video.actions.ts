// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {TodoState} from "../todo/todo.reducer";
// import {ExtraArgument} from "../../index";
// import {TodoService} from "../../../core/services/todo.service";
//
// export const getVideos = createAsyncThunk("todo/getTodo", async (mode: keyof TodoState["todos"], { extra, signal }) => {
//     const { container } = extra as ExtraArgument;
//     const service = container.get();
//     const fn = mode === "user" ? service.user.get : service.common.get;
//
//     return await fn();
// });