import { build } from 'esbuild';
import { baseConfig } from '@repo/esbuild-config';
import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const external = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
];

build({
    ...baseConfig,
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    external,
}).catch(() => process.exit(1));
