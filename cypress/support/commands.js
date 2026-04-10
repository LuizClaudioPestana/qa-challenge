// Comando para fechar/ocultar banners de cookies e ads que bloqueiam interações
Cypress.Commands.add('dismissOverlays', () => {
  cy.get('body').then($body => {
    if ($body.find('#fixedban').length) {
      cy.get('#fixedban').invoke('hide')
    }
    if ($body.find('.fc-button-background').length) {
      cy.get('.fc-button-background').click({ multiple: true, force: true })
    }
  })
})

// Comando para selecionar opção em dropdown react-select
Cypress.Commands.add('selectReactOption', (selector, text) => {
  cy.get(selector).click({ force: true })
  cy.get('.css-26l3qy-menu, [class*="-menu"]').contains(text).click({ force: true })
})
