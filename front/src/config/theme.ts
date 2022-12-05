import { createTheme, Theme } from "@mui/material";
import * as colors from "@mui/material/colors";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		secondary: {
			...colors.grey,
			main: colors.grey["500"],
		},
		primary: {
			...colors.blue,
			main: colors.blue["400"],
		},
		background: {
			paper: "#1d1d1d",
			default: "#181818",
		},
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					"&.MuiPaper-root": {
						backgroundImage: "unset !important",
					},
				},
			},
		},
	},
});

const lightTheme = createTheme({
	palette: {
		mode: "light",
		secondary: {
			...colors.grey,
			main: colors.grey["900"],
		},
		primary: {
			...colors.blue,
			main: colors.blue["400"],
		},
		background: {
			paper: "#ffffff",
			default: "#e6e6e6",
		},
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					"&.MuiPaper-root": {
						backgroundImage: "unset !important",
					},
				},
			},
		},
	},
});

export const themes = {
	dark: darkTheme,
	light: lightTheme,
};

export type Themes = "dark" | "light";
export const getUrlTheme = (): Themes => new URL(window.location.toString()).searchParams.get("theme") || ("dark" as any);

export const getCurrentTheme = (theme: Themes): Theme => themes[theme];
