// jest.config.js
module.exports = {
  // Use the default create-react-app setup for Jest, which includes global functions
  preset: 'react-scripts', 
  
  // Tell Jest where your tests are. The '__tests__' convention is standard.
  testMatch: [
    "**/__tests__/**/*.js",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  
  // Make sure you can use the newer React Testing Library matchers
  setupFilesAfterEnv: ['<rootDir>/node_modules/@testing-library/jest-dom/extend-expect'],
};