import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./module/theme/theme.reducer";
import { authenticationReducer } from "./module/authentication/authentication.reducer";
import { container } from "../core/di";
import { todoReducer } from "./module/todo/todo.reducer";
import { userReducer } from "./module/user/user.reducer";
import { videoReducer } from "./module/video/video.reducer";

const store = configureStore({
	reducer: {
		theme: themeReducer,
		authentication: authenticationReducer,
		user: userReducer,
		video: videoReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: { container } as ExtraArgument } }),
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraArgument = { container: typeof container };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default store;
