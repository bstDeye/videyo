const { spawnSync } = require("child_process");
const path = require("path");

const dockerCommand = `docker buildx build --platform linux/amd64 -f ${__dirname}/Dockerfile  -t elyspio/react-api-template:latest --push .`.split(" ").filter((str) => str.length);

const ret = spawnSync(dockerCommand[0], dockerCommand.slice(1), { cwd: path.resolve(__dirname, "../../"), stdio: "inherit" });

if (ret.status === 0) {
	spawnSync("ssh", ["elyspio@192.168.0.59", "cd /apps/own/react-api-template && docker-compose pull && docker-compose up -d"], {

		cwd: __dirname,
		stdio: "inherit",
	});
}
