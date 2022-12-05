import { Box, Container, Grid, Paper } from "@mui/material";
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
					<Grid container spacing={2}>
						<Grid item xs={true}>
							<Todo mode={"public"} />
						</Grid>
						{logged && <Grid item xs={6}>
							<Todo mode={"user"} />
						</Grid>}

					</Grid>
				</Box>
			</Paper>
		</Container>
	);
};

