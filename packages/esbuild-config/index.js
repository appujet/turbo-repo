/** @type {import('esbuild').BuildOptions} */
export const baseConfig = {
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'esm',
    sourcemap: true,
    minify: process.env.NODE_ENV === 'production',
    logLevel: 'info',
};
