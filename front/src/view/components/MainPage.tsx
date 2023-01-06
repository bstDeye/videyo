import React from 'react';
import {Box, Paper, Stack, Typography} from "@mui/material";
import { Categories } from "./navigation/main/Categories";
import { Video } from "./video/Video";

export function MainPage() {
    return (
        <Paper sx={{maxWidth: "80%", height: "75vh", p: 2, justifySelf: "center", margin: " 0 auto", backgroundColor:"#848484"}}>
            <Box display={"flex"} justifyContent={"center"}>
                <Stack>
                    <Typography>Welcome to Videyo !</Typography>
                    <Typography>Get started :</Typography>
                </Stack>
            </Box>
            <Stack alignItems={"space-between"} height={"100%"}>
                <Stack  direction={"row"} spacing={5} width={"100%"} height={"60%"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
                   <Categories/>

                </Stack>
                <Paper>
                   <Video/>
                </Paper>
            </Stack>

        </Paper>
    );
}

