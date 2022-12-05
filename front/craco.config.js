// craco.config.js
const CracoSwcPlugin = require("craco-swc");

module.exports = {
	plugins: [
		{
			plugin: CracoSwcPlugin,
			options: {
				swcLoaderOptions: {
					jsc: {
						externalHelpers: true,
						target: "es2015",
						parser: {
							syntax: "typescript",
							jsx: true,
							dynamicImport: true,
							decorators: true,
							exportDefaultFrom: true,
						},
					},
				},
			},
		},
	],
	webpack: {
		configure: {
			ignoreWarnings: [
				function ignoreSourceMapsLoaderWarnings(warning) {
					return warning.module?.resource.includes("node_modules") && warning.details?.includes("source-map-loader");
				},
			],
		},
	},
};
