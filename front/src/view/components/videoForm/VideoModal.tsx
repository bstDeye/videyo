import React from "react";
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
	Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { More } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";

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
		categorie: "",


	});

	const handleChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setFormValues((current) => {
			return {
				...current,
				[name]: value,
			};
		});
	};
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (

		<>
			<IconButton onClick={handleOpen}>
				<Add />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle> Ajouter une vidéo</DialogTitle>
				<DialogContent
					sx={{ minWidth: 350 }}
					dividers>
					<Stack spacing={2}>
						<FormControl fullWidth>
							<InputLabel>Media</InputLabel>
							<Select
								value={formValues.media}
								label="Media"
								onChange={handleChange}
								required

							>
								<MenuItem value={"Tiktok"}>Tiktok</MenuItem>
								<MenuItem value={"Instagram"}>Instagram</MenuItem>
								<MenuItem value={"Twitter"}>Twitter</MenuItem>
								<MenuItem value={"Youtube"}>Youtube</MenuItem>
							</Select>
							<FormHelperText>Media d'origine de la vidéo</FormHelperText>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel>Catégorie</InputLabel>
							<Select
								value={formValues.categorie}
								label="Categorie"
								onChange={handleChange}
								required

							>
								<MenuItem value={"Cheveux"}>Cheveux</MenuItem>
								<MenuItem value={"Visage"}>Visage</MenuItem>
								<MenuItem value={"Corps"}>Corps</MenuItem>
								<MenuItem value={"Creature"}>Créature</MenuItem>
								<MenuItem value={"Autre"}>Autre</MenuItem>
							</Select>
							<FormHelperText>Type de contenu</FormHelperText>
						</FormControl>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button> Ajouter</Button>
				</DialogActions>
			</Dialog>


		</>


	);
}

