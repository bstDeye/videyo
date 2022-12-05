import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../../core/apis/backend/generated";
import { addTodo, checkTodo, deleteTodo, getTodos } from "./todo.actions";

export type TodoState = {
	todos: {
		public: Todo[];
		user: Todo[];
	};
};

const initialState: TodoState = {
	todos: {
		public: [],
		user: [],
	},
};

const slice = createSlice({
	name: "todo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTodos.fulfilled, (state, action) => {
			state.todos[action.meta.arg] = action.payload;
		});

		builder.addCase(addTodo.fulfilled, (state, action) => {
			state.todos[action.meta.arg.mode].push(action.payload);
		});

		builder.addCase(deleteTodo.fulfilled, (state, action) => {
			state.todos[action.meta.arg.mode] = state.todos[action.meta.arg.mode].filter((todo) => todo.id !== action.meta.arg.id);
		});

		builder.addCase(checkTodo.fulfilled, (state, action) => {
			state.todos[action.meta.arg.mode] = state.todos[action.meta.arg.mode].filter((todo) => todo.id !== action.meta.arg.id);
			state.todos[action.meta.arg.mode].push(action.payload);
		});
	},
});

export const todoReducer = slice.reducer;
