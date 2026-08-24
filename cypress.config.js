const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: "Test Automation Report - ServeRest",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportFilename: "[status]_[datetime]-[name]-report",
    timestamp: "longDate"
  },

  reporterOptions: {
  reportDir: "cypress/reports",
  overwrite: false,
  html: true,
  json: true,
  charts: true,
  reportPageTitle: "Test Automation Report - ServeRest",
  embeddedScreenshots: true,
  inlineAssets: true,
  saveAllAttempts: false,
  reportFilename: "[status]_[datetime]-[name]-report",
  timestamp: "longDate",
  code: false
},
  
  e2e: {
    baseUrl: "https://front.serverest.dev",
    specPattern: "cypress/e2e/**/*.{feature,cy.js}",
    screenshotOnRunFailure: true,
    video: false,

    async setupNodeEvents(on, config) {
      // Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // Mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // File preprocessor
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
