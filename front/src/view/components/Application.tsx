import * as React from "react";
import "./Application.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../store/module/theme/theme.action";
import { Box } from "@mui/material";
import { bindActionCreators } from "redux";
import { Accessibility, DarkMode, LightMode, SentimentSatisfiedAlt } from "@mui/icons-material";
import { DrawerAction } from "./utils/drawer/drawer.constantes";
import { MainPage } from "./MainPage";
import { DrawerLeft } from "./utils/drawer/Drawer";
import { LeftMenu } from "./navigation/LeftMenu";
import { login, logout } from "../../store/module/authentication/authentication.async.action";
import { useEffect } from "react";
import { initApp } from "../../store/common/common.actions";

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
			label: theme === "dark" ? "Light Mode" : "Dark Mode",
		},
		{
			icon: <SentimentSatisfiedAlt />,
			onClick: storeActions.toggleTheme,
			label: "Face",
		},
		{
			icon: <Accessibility />,
			onClick: storeActions.toggleTheme,
			label: "Body",
		},
	];


	useEffect(()=> {
		dispatch(initApp())
	}, [dispatch])

	return (
		<Box className={"Application"}>
			<DrawerLeft title={"Videyo"} actions={actions}>
				<LeftMenu />
				<MainPage />
			</DrawerLeft>

		</Box>
	);
}

export default Application;
