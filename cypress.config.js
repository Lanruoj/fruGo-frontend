const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
  },
});
