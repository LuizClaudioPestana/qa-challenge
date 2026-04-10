const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const WebTablesPage = require('../../../pages/WebTablesPage')

Given('estou na página Web Tables', () => {
  WebTablesPage.visit()
})

When('adiciono um registro com os dados:', datatable => {
  const row = datatable.hashes()[0]
  WebTablesPage.addRecord(row)
  // Sem search aqui: o React Table faz re-mount ao digitar no searchBox,
  // causando um gap onde .rt-tbody some temporariamente.
  // A assertion verifica a tabela completa (sem filtro).
})

When('adiciono um registro com nome {string}, sobrenome {string}, email {string}, idade {string}, salário {string} e departamento {string}',
  (firstName, lastName, email, age, salary, department) => {
    WebTablesPage.addRecord({ firstName, lastName, email, age, salary, department })
  }
)

Then('o registro {string} deve aparecer na tabela', name => {
  WebTablesPage.assertRecordExists(name)
})

When('edito o primeiro registro visível alterando o nome para {string}', newName => {
  WebTablesPage.editFirstVisible()
  cy.get('#firstName').clear().type(newName)
  WebTablesPage.submitForm()
})

When('deleto o primeiro registro visível', () => {
  WebTablesPage.deleteFirstVisible()
})

When('deleto o primeiro registro visível com email {string}', email => {
  // Search antes de deletar garante que só o registro alvo está visível
  WebTablesPage.search(email)
  WebTablesPage.deleteFirstVisible()
  WebTablesPage.clearSearch()
})

Then('nenhum registro deve ser encontrado', () => {
  WebTablesPage.assertNoDataFound()
})
