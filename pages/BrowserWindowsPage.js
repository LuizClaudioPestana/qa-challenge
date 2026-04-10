class BrowserWindowsPage {
  visit() {
    cy.visit('/browser-windows')
    cy.dismissOverlays()
  }

  // Valida que o botão existe e está visível antes de navegar
  assertNewWindowButtonExists() {
    cy.contains('button', 'New Window').should('be.visible')
  }

  assertNewTabButtonExists() {
    cy.contains('button', 'New Tab').should('be.visible')
  }

  // Navega diretamente para a página que seria aberta na nova janela.
  // cy.stub(win, 'open') causa "bad IPC message reason 114" no Chrome
  // por conflito com iframes cross-origin dos ads do demoqa.
  visitSamplePage() {
    cy.visit('/sample')
  }

  assertSamplePageContent(text) {
    cy.get('body').should('contain', text)
  }
}

module.exports = new BrowserWindowsPage()
