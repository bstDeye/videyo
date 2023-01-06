import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import { VideoModal } from "../../video/videoForm/VideoModal";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAppDispatch } from "../../../../store";
import { login } from "../../../../store/module/authentication/authentication.async.action";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

interface DrawerAppBarProps {
	handleDrawer: () => void,
	open: boolean
	title: string,
}

export function DrawerAppBar({ handleDrawer, title, open }: DrawerAppBarProps) {

	const dispatch = useAppDispatch();
	const handleLogin = () => {
		dispatch(login());
	};

	return (
		<AppBar position="fixed" open={open}>
			<Toolbar>
				<IconButton
					color="inherit"
					onClick={handleDrawer}
					edge="start"
					sx={{ mr: 2, ...(open && { display: "none" }) }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					{title}
				</Typography>
				<VideoModal />
				<IconButton onClick={handleLogin}>
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}

