class ProgressBarPage {
  visit() {
    cy.visit('/progress-bar')
    cy.dismissOverlays()
  }

  clickStartStop() {
    cy.get('#startStopButton').click()
  }

  clickReset() {
    cy.get('#resetButton').click()
    // Aguarda o botão de reset desaparecer — confirma que o ciclo de reset completou
    cy.get('#resetButton', { timeout: 8000 }).should('not.exist')
  }

  getValue() {
    return cy.get('.progress-bar').invoke('attr', 'aria-valuenow').then(v => parseInt(v))
  }

  waitUntilAtLeast(percent, timeout = 10000) {
    cy.get('.progress-bar', { timeout }).should($el => {
      expect(parseInt($el.attr('aria-valuenow'))).to.be.gte(percent)
    })
  }

  waitUntil100(timeout = 15000) {
    cy.get('.progress-bar', { timeout }).should('have.attr', 'aria-valuenow', '100')
  }

  assertValue(expected) {
    if (expected === 0) {
      // Após Reset no demoqa, aria-valuenow NÃO é atualizado para 0.
      // O Reset reseta apenas o estado interno e o CSS width.
      // Verificamos pelo style inline que a barra voltou a 0%.
      cy.get('.progress-bar').should($el => {
        const width = parseFloat($el[0].style.width)
        expect(width).to.eq(0)
      })
    } else {
      cy.get('.progress-bar').should('have.attr', 'aria-valuenow', String(expected))
    }
  }

  assertValueLessThanOrEqual(max) {
    // .should() com callback também retenta
    cy.get('.progress-bar').invoke('attr', 'aria-valuenow').should(v => {
      expect(parseInt(v)).to.be.lte(max)
    })
  }
}

module.exports = new ProgressBarPage()
