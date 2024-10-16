import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      include: ['packages/shared-utils/**/*.{test,spec}.ts'],
      name: 'shared-utils',
      environment: 'node',
    },
  },
  {
    extends: './vitest.config.ts',
    test: {
      include: ['apps/aglint-recruiter/test/**/*.{test,spec}.ts'],
      name: 'aglint-web',
      environment: 'node',
    },
  },
]);
