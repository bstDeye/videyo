import React, { useCallback, useEffect, useMemo } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { TodoState } from "../../../../store/module/todo/todo.reducer";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { bindActionCreators } from "redux";
import { addTodo, checkTodo, deleteTodo, getTodos } from "../../../../store/module/todo/todo.actions";
import { useModal } from "../../../hooks/useModal";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import { TodoItem } from "./TodoItem";

type TodoProps = {
	mode: keyof TodoState["todos"];
};

export function Todo({ mode }: TodoProps) {
	const { todos, logged } = useAppSelector((state) => ({
		todos: [...state.todo.todos[mode]].sort((a, b) => a.label.localeCompare(b.label)),
		logged: state.authentication.logged,
	}));

	const dispatch = useAppDispatch();
	const actions = useMemo(() => bindActionCreators({ addTodo, deleteTodo, checkTodo, getTodos }, dispatch), [dispatch]);

	const [label, setLabel] = React.useState("");

	const { open, setOpen, setClose } = useModal(false);

	const add = useCallback(async () => {
		setClose();
		await actions.addTodo({ label, mode });
	}, [mode, actions, label, setClose]);

	useEffect(() => {
		actions.getTodos(mode);
	}, [actions, mode]);

	const { palette } = useTheme();

	return (
		<Grid container direction={"column"} alignItems={"center"} justifyContent={"center"} p={3}>
			<Grid container item my={3} alignItems={"center"} justifyContent={"space-between"}>
				<Grid item>
					<Typography variant={"overline"}>{mode}</Typography>
				</Grid>
				{logged && <Grid item>
					<IconButton color={"success"} onClick={setOpen}>
						<Add />
					</IconButton>
				</Grid>}

			</Grid>

			<Grid item width={"100%"}>
				<Paper sx={{ backgroundColor: palette.background.default }}>
					<TableContainer>
						<Table sx={{}} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Label</TableCell>
									<TableCell align="right">Done</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{todos.map((row) => (
									<TodoItem key={row.id} mode={mode} data={row} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Grid>

			<Dialog open={open} onClose={setClose}>
				<DialogTitle>Add a todo</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter a label for the new todo</DialogContentText>
					<TextField autoFocus margin="dense" id="todo-label" label="Label" fullWidth variant="standard" value={label} onChange={(e) => setLabel(e.target.value)} />
				</DialogContent>
				<DialogActions>
					<Button onClick={setClose}>Cancel</Button>
					<Button onClick={add}>Add</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}
