module.exports = {
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".*\\.test\\.ts$",
  transformIgnorePatterns: ['node_modules/(?!(nanoid)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  "moduleNameMapper": {
    '^@/(.*)$': '<rootDir>/$1'
  },
  "setupFiles": ["<rootDir>/src/test/setEnvVars.ts"]
}
