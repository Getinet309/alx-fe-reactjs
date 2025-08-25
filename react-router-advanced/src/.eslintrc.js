module.exports = {
  // Your existing configurations
  extends: [
    'react-app',
    'plugin:jest/recommended',
  ],
  env: {
    jest: true,
  },
  // New section to handle Node.js files
  overrides: [
    {
      files: [
        // Target the jest.config.js file
        'jest.config.js',
      ],
      env: {
        // Enable the Node.js environment
        node: true,
      },
    },
  ],
};