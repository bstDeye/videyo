import {Box, Container, Grid, Paper, Stack, Typography} from "@mui/material";
import "./Test.scss";
import * as React from "react";
import { Todo } from "./todo/Todo";
import { useAppSelector } from "../../../store";

export const Todos = () => {
	const logged = useAppSelector(s => s.authentication.logged);
	return (
		<Container className={"Test"}>
			<Paper>
				<Box p={2}>
					<Stack>
						<Typography>Blabla</Typography>
						<Typography>Blabla</Typography>
						<Typography>Blabla</Typography>
						<Typography>Blabla</Typography>
						<Typography>Blabla</Typography>
						<Typography>Blabla</Typography>
					</Stack>
				</Box>
			</Paper>
		</Container>
	);
};

