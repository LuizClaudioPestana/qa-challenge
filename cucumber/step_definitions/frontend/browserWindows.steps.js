const { Given, Then } = require('@badeball/cypress-cucumber-preprocessor')
const BrowserWindowsPage = require('../../../pages/BrowserWindowsPage')

Given('estou na página Browser Windows', () => {
  BrowserWindowsPage.visit()
})

Then('o botão {string} deve estar visível', buttonText => {
  cy.contains('button', buttonText).should('be.visible')
})

Then('a página da nova janela deve conter {string}', text => {
  BrowserWindowsPage.visitSamplePage()
  BrowserWindowsPage.assertSamplePageContent(text)
})
