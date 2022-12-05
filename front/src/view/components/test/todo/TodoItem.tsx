import React, { useCallback, useMemo } from "react";
import { Todo } from "../../../../core/apis/backend/generated";
import { Menu, MenuItem, Switch, TableCell, TableRow, Typography } from "@mui/material";
import { useMenu } from "../../../hooks/useMenu";
import { useAppDispatch } from "../../../../store";
import { bindActionCreators } from "redux";
import { addTodo, checkTodo, deleteTodo, getTodos } from "../../../../store/module/todo/todo.actions";
import { TodoState } from "../../../../store/module/todo/todo.reducer";

// TodoItem Props
interface TodoItemProps {
	data: Todo;
	mode: keyof TodoState["todos"];
}

export function TodoItem({ data, mode }: TodoItemProps) {
	const { open: menuOpen, closeMenu, onContextMenu, position } = useMenu();

	const dispatch = useAppDispatch();
	const actions = useMemo(() => bindActionCreators({ addTodo, deleteTodo, checkTodo, getTodos }, dispatch), [dispatch]);

	const onSwitchClick = useCallback(async () => {
		await actions.checkTodo({ mode, id: data.id });
	}, [actions, mode, data]);

	const remove = useCallback(async () => {
		closeMenu();
		await actions.deleteTodo({ id: data.id, mode });
	}, [mode, actions, data, closeMenu]);

	return (
		<>
			<Menu open={menuOpen} onClose={closeMenu} anchorReference="anchorPosition" anchorPosition={position}>
				<MenuItem color={"error"} onClick={remove}>
					Delete
				</MenuItem>
			</Menu>

			<TableRow onContextMenu={onContextMenu} key={data.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
				<TableCell scope="row">
					<Typography>{data.label}</Typography>
				</TableCell>
				<TableCell align="right">{<Switch onClick={onSwitchClick} checked={data.checked} />}</TableCell>
			</TableRow>
		</>
	);
}
