import React, { ReactChild } from "react";
import {
	Box,
	Button, Dialog, DialogActions, DialogContent, DialogTitle,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	SelectChangeEvent,
	Stack, TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { More } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import { useAppDispatch } from "../../../../store";
import { addVideo } from "../../../../store/module/video/video.async.actions";
import { Application } from "../../../../core/apis/backend/generated";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

type VideoFormProps = {}

export function VideoModal({}: VideoFormProps) {

	const [formValues, setFormValues] = React.useState({

		media: "",
		category: "",

	});

	const [textFieldState, setTextFieldStateState] = React.useState({
		title: "",
		link: "",
		credits: "",
	});


	const handleSelectChange = (name: keyof typeof formValues) => (event: SelectChangeEvent) => {
		setFormValues((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			};
		});
	};

	const handleTextFieldChange = (name: keyof typeof textFieldState) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextFieldStateState((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			};
		});
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const dispatch = useAppDispatch();

	const addNewVideo = () => {
		//TODO jarter comments nbLikes et user
		dispatch(addVideo({
			label: textFieldState.title,
			comments: [],
			nbLikes: 0,
			origin: {
				url: textFieldState.link,
				credits: [textFieldState.credits],
				app: formValues.media as Application
			},
			user: "271faf63-37f0-f12a-50e3-1ebb05050505"

		}));
	}

	return (

		<>
			<IconButton onClick={handleOpen}>
				<Add />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle> Add a video</DialogTitle>
				<DialogContent
					sx={{ minWidth: 350 }}
					dividers>
					<Stack spacing={2}>
						<FormControl fullWidth>
							<InputLabel>Media</InputLabel>
							<Select
								value={formValues.media}
								label="Media"
								onChange={handleSelectChange("media")}
								required

							>
								<MenuItem value={"Tiktok"}>Tiktok</MenuItem>
								<MenuItem value={"Instagram"}>Instagram</MenuItem>
								<MenuItem value={"Twitter"}>Twitter</MenuItem>
								<MenuItem value={"Youtube"}>Youtube</MenuItem>
								<MenuItem value={"Reddit"}>Reddit</MenuItem>
							</Select>
							<FormHelperText>What media the video was chosen from</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel>Category</InputLabel>
							<Select
								value={formValues.category}
								label="Categorie"
								onChange={handleSelectChange("category")}
								required

							>
								<MenuItem value={"Hair"}>Hair</MenuItem>
								<MenuItem value={"Face"}>Face</MenuItem>
								<MenuItem value={"Body"}>Body</MenuItem>
								<MenuItem value={"Creature"}>Creature</MenuItem>
								<MenuItem value={"Other"}>Other</MenuItem>
							</Select>
							<FormHelperText>What's the video about</FormHelperText>

						</FormControl>
						<FormControl>
							<TextField
								onChange={handleTextFieldChange("title")}
								value={textFieldState.title}
								label={"Title"}
								margin={"dense"} />
							<FormHelperText>Name the video</FormHelperText>


							<TextField
								onChange={handleTextFieldChange("link")}
								value={textFieldState.link}
								label={"Link"}
								margin={"dense"} />
							<FormHelperText>Link to the video</FormHelperText>

							<TextField
								onChange={handleTextFieldChange("credits")}
								value={textFieldState.credits}
								label={"Credits"}
								margin={"dense"} />
							<FormHelperText>Who made it </FormHelperText>

						</FormControl>

					</Stack>
				</DialogContent>
				<DialogActions onClick={addNewVideo}>
					<Button> Add</Button>
				</DialogActions>
			</Dialog>


		</>


	);
}

