// Sample configuration file with potential security issues

const config = {
  // Hard-coded secret keys (these are fake and for testing purposes only)
  apiKey: "1234567890abcdef1234567890abcdef",
  dbPassword: "SuperSecretPassword123!",

  // Insecure API endpoint configuration
  apiEndpoint: "http://api.example.com", // Note: Using HTTP instead of HTTPS

  // Sample vulnerable code
  executeCommand: function(command) {
    const exec = require('child_process').exec;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error}`);
        return;
      }
      console.log(`Result: ${stdout}`);
    });
  },

  // Outdated dependencies
  dependencies: {
    "express": "4.16.0",  // Example of outdated dependency
    "lodash": "3.10.1"
  }
};

module.exports = config;
