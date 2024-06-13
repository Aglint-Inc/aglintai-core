import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  ...options,
  entryPoints: ["src"],
  clean: true,
  format: ["cjs"],
  outDir: "build",
  bundle: false,
}));
