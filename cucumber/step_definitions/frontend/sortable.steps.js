const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const SortablePage = require('../../../pages/SortablePage')

let firstItemText
let initialCount

Given('estou na página Sortable', () => {
  SortablePage.visit()
})

When('capturo o texto do primeiro item da lista', () => {
  cy.get('#demo-tabpane-list .list-group-item').first().invoke('text').then(text => {
    firstItemText = text.trim()
  })
})

When('arrasto o último item para a primeira posição', () => {
  SortablePage.dragLastToFirst()
})

Then('a ordem da lista deve ter mudado', () => {
  cy.get('#demo-tabpane-list .list-group-item')
    .first()
    .invoke('text')
    .then(text => {
      expect(text.trim()).to.not.eq(firstItemText)
    })
})

When('capturo a quantidade de itens na lista', () => {
  cy.get('#demo-tabpane-list .list-group-item').then($items => {
    initialCount = $items.length
  })
})

When('arrasto o primeiro item para a última posição', () => {
  SortablePage.dragFirstToLast()
})

Then('a quantidade de itens deve ser a mesma', () => {
  cy.get('#demo-tabpane-list .list-group-item').should('have.length', initialCount)
})
