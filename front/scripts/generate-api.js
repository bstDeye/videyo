var path = require("path");
var readFileSync = require("fs").readFileSync;
var execSync = require("child_process").execSync;
function generateFromNswag(_a) {
    var outputFile = _a.outputFile, file = _a.file, input = _a.input;
    var command = "nswag run ".concat(file, " /variables:INPUT_URL=").concat(input, ",OUTPUT_FILE=").concat(outputFile);
    var _b = JSON.parse(readFileSync(file).toString()).codeGenerators.openApiToTypeScriptClient, clientBaseClass = _b.clientBaseClass, configurationClass = _b.configurationClass;
    console.log("Executing \"".concat(command, "\""));
    execSync(command, { stdio: "inherit" });
}
if (require.main === module) {
    console.log("Generating http clients for Api");
    generateFromNswag({
        input: "http://localhost:4000/swagger/Example.Api/swagger.json",
        file: path.resolve(__dirname, "nswag-api-rest.nswag"),
        outputFile: path.resolve(__dirname, "..", "src", "core", "apis", "backend", "generated.ts")
    });
}
