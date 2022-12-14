import React from 'react';
import {Box, Paper, Stack, Typography} from "@mui/material";

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
                    <Paper>
                        <Box p={10} >
                            <Typography> Face </Typography>
                        </Box>
                    </Paper>
                    <Paper>
                        <Box p={10} >
                            <Typography> Body </Typography>
                        </Box>
                    </Paper>
                    <Paper>
                        <Box p={10} >
                            <Typography> Other </Typography>
                        </Box>
                    </Paper>

                </Stack>
                <Paper>
                    <Box width={"50%"}>
                        <Typography> Explore: Hebdrawmadaire</Typography>
                    </Box>
                </Paper>
            </Stack>

        </Paper>
    );
}

