import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { login } from "../../../store/module/authentication/authentication.action";
import { useAppDispatch } from "../../../store";

interface NavBarProps {
	handleDrawerOpen: () => void;
	handleDrawerClose: () => void;
	isOpen: boolean;
}

export function NavBar({ handleDrawerOpen, handleDrawerClose, isOpen }: NavBarProps) {
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const dispatch = useAppDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogin = () => {
		dispatch(login);
	};

	return (
		<AppBar position={"fixed"}>
			<Toolbar>
				<IconButton
					onClick={isOpen ? handleDrawerClose : handleDrawerOpen}
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Hebdrawmadaire
				</Typography>
				<IconButton onClick={handleLogin}>
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}