require('esbuild').build({
  entryPoints: ['src/index.ts'],
  format: 'esm',
  bundle: true,
  outfile: 'dist/worker.mjs',
}).catch(() => process.exit(1))