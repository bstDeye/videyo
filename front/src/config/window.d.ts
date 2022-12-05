export type Config = {
	endpoints: {
		core: string;
		authentication: string;
	};
	loginPageUrl: "http://localhost";
};

declare global {
	interface Window {
		config: Config;
	}
}
