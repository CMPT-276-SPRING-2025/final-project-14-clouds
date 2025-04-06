export default{
    // Setup files to be run before tests
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
    // Test environment to use
    testEnvironment: 'jsdom',
  
    // Mapping for module imports
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
  
    // Babel transformer for JSX and JS files
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest",
      '^.+\\.css$': 'jest-transform-stub', // Mock CSS imports
    },
  };
  