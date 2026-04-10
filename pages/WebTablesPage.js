class WebTablesPage {
  visit() {
    cy.visit('/webtables')
    cy.dismissOverlays()
  }

  clickAdd() {
    cy.get('#addNewRecordButton').click()
  }

  fillForm({ firstName, lastName, email, age, salary, department }) {
    cy.get('#firstName').clear().type(firstName)
    cy.get('#lastName').clear().type(lastName)
    cy.get('#userEmail').clear().type(email)
    cy.get('#age').clear().type(age)
    cy.get('#salary').clear().type(salary)
    cy.get('#department').clear().type(department)
  }

  submitForm() {
    cy.get('#submit').click()
    // Aguarda modal fechar — aceita tanto React (remove do DOM) quanto Bootstrap (oculta)
    cy.get('body', { timeout: 10000 }).should($body => {
      const modal = $body.find('.modal-content')
      if (modal.length === 0) return           // removido do DOM — OK
      expect(modal.is(':visible')).to.be.false  // ainda no DOM mas oculto — OK
    })
  }

  addRecord(data) {
    this.clickAdd()
    this.fillForm(data)
    this.submitForm()
  }

  search(term) {
    cy.get('#searchBox').clear().type(term)
  }

  clearSearch() {
    cy.get('#searchBox').clear()
  }

  editFirstVisible() {
    cy.get('[title="Edit"]').first().click()
  }

  deleteFirstVisible() {
    cy.get('[title="Delete"]').first().click()
  }

  assertRecordExists(text) {
    // cy.contains() é agnóstico à versão/estrutura do React Table
    cy.contains(text).should('be.visible')
  }

  assertRecordNotExists(text) {
    cy.contains(text).should('not.exist')
  }

  assertNoDataFound() {
    // Múltiplos seletores para compatibilidade entre versões do React Table
    cy.get('.rt-noData, [class*="noData"], [class*="empty-table"]')
      .first()
      .should('be.visible')
  }

  getRowCount() {
    return cy.get('[title="Edit"]').its('length')
  }
}

module.exports = new WebTablesPage()
