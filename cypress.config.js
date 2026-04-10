const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cucumber/features/**/*.feature'
    ],
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)]
      }))

      // Desabilita o isolamento de processo por site do Chrome,
      // que é a causa raiz do "bad IPC message reason 114"
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-site-isolation-trials')
          launchOptions.args.push('--disable-features=IsolateOrigins,site-per-process')
        }
        return launchOptions
      })

      return config
    }
  }
})
