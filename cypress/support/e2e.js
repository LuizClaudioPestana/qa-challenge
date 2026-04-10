import '@4tw/cypress-drag-drop'
import './commands'

// Suprime erros de JS não capturados do site demoqa (ads, etc.)
Cypress.on('uncaught:exception', () => false)

// Bloqueia redes de anúncios ANTES de cada teste.
// Os iframes cross-origin dos ads são a causa raiz do:
// "bad IPC message reason 114 - Terminating renderer"
// O Chrome termina o renderer ao detectar mensagens IPC inválidas vindas
// desses iframes. Bloqueá-los na origem evita que sejam criados.
beforeEach(() => {
  cy.intercept(/googlesyndication\.com/, { statusCode: 204, body: '' })
  cy.intercept(/doubleclick\.net/, { statusCode: 204, body: '' })
  cy.intercept(/googleadservices\.com/, { statusCode: 204, body: '' })
  cy.intercept(/google-analytics\.com/, { statusCode: 204, body: '' })
  cy.intercept(/googletagmanager\.com/, { statusCode: 204, body: '' })
  cy.intercept(/adservice\.google\.com/, { statusCode: 204, body: '' })
})
