const path = require("path");
const { readFileSync } = require("fs");
const { execSync } = require("child_process");

type NSwagConf = {
	//  Fichier de configuration nswag
	file: string; //  url du Swagger.json
	input: string; // fichier de destination (généré)
	outputFile: string; // fichier de configuration de l'authentification (contenant les classes AuthorizedApiBase et IConfig)
};

function generateFromNswag({ outputFile, file, input }: NSwagConf) {
	const command = `nswag run ${file} /variables:INPUT_URL=${input},OUTPUT_FILE=${outputFile}`;
	const {
		codeGenerators: {
			openApiToTypeScriptClient: { clientBaseClass, configurationClass },
		},
	} = JSON.parse(readFileSync(file).toString());

	console.log(`Executing "${command}"`);
	execSync(command, { stdio: "inherit" });
}

if (require.main === module) {
	console.log("Generating http clients for Api");
	generateFromNswag({
		input: "http://localhost:4000/swagger/Example.Api/swagger.json",
		file: path.resolve(__dirname, "nswag-api-rest.nswag"),
		outputFile: path.resolve(
			__dirname,
			"..",
			"src",
			"core",
			"apis",
			"backend",
			"generated.ts",
		),
	});
}
