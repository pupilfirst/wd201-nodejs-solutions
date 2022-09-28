const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    video: false,
    setupNodeEvents(on, config) {
      require("cypress-json-results")({
        on,
        filename: "results.json",
      });
    },
  },
});
