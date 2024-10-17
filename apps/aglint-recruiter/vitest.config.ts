import {
  configDefaults,
  defineConfig,
  mergeConfig,
  type ViteUserConfig,
} from 'vitest/config';

import viteConfig from '../../vitest.config';

const config = mergeConfig(
  viteConfig, // Extending from an existing Vite configuration (`vite.config.ts` file)
  defineConfig({
    test: {
      ...configDefaults, // Extending Vitest's default options
    },
  }) as ViteUserConfig,
);

export default config;
