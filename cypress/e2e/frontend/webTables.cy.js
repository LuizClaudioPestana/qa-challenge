const WebTablesPage = require('../../../pages/WebTablesPage')

describe('Web Tables — CRUD', () => {
  const uniqueEmail = `qa_${Date.now()}@test.com`
  const record = {
    firstName: 'Automacao',
    lastName: 'Teste',
    email: uniqueEmail,
    age: '30',
    salary: '5000',
    department: 'QA'
  }

  beforeEach(() => {
    WebTablesPage.visit()
  })

  it('deve criar, editar e deletar um registro', () => {
    // ─── Criar ───────────────────────────────────────────────────────────────
    WebTablesPage.addRecord(record)
    // Sem search aqui: o React Table faz re-mount ao digitar no searchBox,
    // causando um gap onde .rt-tbody some temporariamente.
    WebTablesPage.assertRecordExists('Automacao')

    // ─── Editar ───────────────────────────────────────────────────────────────
    // Search antes de editar para garantir que clicamos no registro certo
    WebTablesPage.search(uniqueEmail)
    WebTablesPage.editFirstVisible()
    cy.get('#firstName').clear().type('AutomacaoEditado')
    WebTablesPage.submitForm()
    WebTablesPage.clearSearch()
    WebTablesPage.assertRecordExists('AutomacaoEditado')

    // ─── Deletar ──────────────────────────────────────────────────────────────
    WebTablesPage.search(uniqueEmail)
    WebTablesPage.deleteFirstVisible()
    WebTablesPage.assertNoDataFound()
  })
})
