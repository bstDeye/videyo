import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExtraArgument } from "../../index";
import { TodoService } from "../../../core/services/todo.service";
import { TodoState } from "./todo.reducer";
import { Todo } from "../../../core/apis/backend/generated";

export const getTodos = createAsyncThunk("todo/getTodo", async (mode: keyof TodoState["todos"], { extra, signal }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(TodoService);
	const fn = mode === "user" ? service.user.get : service.common.get;

	return await fn();
});

type AddTodoProps = { mode: keyof TodoState["todos"]; label: string };
export const addTodo = createAsyncThunk("todo/addTodo", async ({ mode, label }: AddTodoProps, { extra }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(TodoService);
	const fn = mode === "user" ? service.user.add : service.common.add;
	return await fn(label);
});

type DeleteTodoProps = { mode: keyof TodoState["todos"]; id: Todo["id"] };
export const deleteTodo = createAsyncThunk("todo/deleteTodo", async ({ mode, id }: DeleteTodoProps, { extra, signal, requestId }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(TodoService);
	const fn = mode === "user" ? service.user.remove : service.common.remove;
	return await fn(id);
});

export const checkTodo = createAsyncThunk("todo/checkTodo", async ({ mode, id }: DeleteTodoProps, { extra }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(TodoService);
	const fn = mode === "user" ? service.user.check : service.common.check;
	return await fn(id);
});

