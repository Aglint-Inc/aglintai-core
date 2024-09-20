import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src', 'test'],
  clean: true,
  format: ['cjs'],
  outDir: 'build',
  bundle: false,
  // watch: {
  //   dirs: ['src', 'test'], // Specify directories to watch for changes
  //   include: ['**/*.ts'], // Include TypeScript files
  // },
});
