export default {
  // Setup files to be run before tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test environment to use
  testEnvironment: 'jsdom',

  // Mapping for module imports
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    '\\.(css|less|scss|sass)$': 'jest-transform-stub',   // Mock CSS files
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',  // Mock images
  },

  // Babel transformer for JSX and JS files
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};