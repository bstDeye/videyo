import * as React from "react";
import "./Application.scss";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import { Todos } from "./test/Todos";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../store/module/theme/theme.action";
import { createDrawerAction, withDrawer } from "./utils/drawer/Drawer.hoc";
import {Box, Stack, Typography} from "@mui/material";
import { login, logout, silentLogin } from "../../store/module/authentication/authentication.action";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
	Accessibility,
	AcUnit,
	AddBox,
	DarkMode,
	Face,
	LightMode,
	SentimentDissatisfied,
	SentimentSatisfied, SentimentSatisfiedAlt
} from "@mui/icons-material";
import {NavMenu} from "./navigation/NavMenu";
import {NavBar} from "./navigation/NavBar";
import { PersistentDrawerLeft} from "./utils/drawer/Drawer2";
import {DrawerAction} from "./utils/drawer/drawer.constantes";
import {MainPage} from "./MainPage";

function Application() {
	const dispatch = useAppDispatch();

	const { theme, themeIcon, logged } = useAppSelector((s) => ({
		theme: s.theme.current,
		themeIcon: s.theme.current === "dark" ? <LightMode /> : <DarkMode />,
		logged: s.authentication.logged,
	}));

	const storeActions = React.useMemo(() => bindActionCreators({ toggleTheme, logout, login }, dispatch), [dispatch]);

	const actions: DrawerAction[] = [
		{
			icon: themeIcon,
			onClick: storeActions.toggleTheme,
			label: theme === "dark" ? "Light Mode" : "Dark Mode"
		},
		{
			icon: <SentimentSatisfiedAlt/>,
			onClick: storeActions.toggleTheme,
			label: "Face",
		},
		{
			icon: <Accessibility/>,
			onClick: storeActions.toggleTheme,
			label: "Body",
		}
	];

	return (
		<Box className={"Application"} >
			<PersistentDrawerLeft title={"Videyo"} actions={actions}>
				<MainPage />
			</PersistentDrawerLeft>

		</Box>
	);
}

export default Application;
