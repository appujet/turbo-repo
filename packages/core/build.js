import fs from "node:fs";
import { baseConfig } from "@repo/esbuild-config";
import { build } from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const external = [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.peerDependencies || {})];

build({
	...baseConfig,
	plugins: [
		esbuildPluginTsc({
			force: true,
		}),
	],
	entryPoints: ["src/index.ts"],
	outfile: "dist/index.js",
	external,
}).catch(() => process.exit(1));
