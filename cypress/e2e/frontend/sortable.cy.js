const SortablePage = require('../../../pages/SortablePage')

describe('Sortable — Drag & Drop', () => {
  beforeEach(() => {
    SortablePage.visit()
  })

  it('deve reordenar itens via drag and drop', () => {
    // Captura a ordem inicial
    SortablePage.getListItemTexts().then(initialOrder => {
      const firstItemText = initialOrder[0]

      // Arrasta o último item para a primeira posição
      SortablePage.dragLastToFirst()

      // Valida que a ordem mudou (primeiro item agora é diferente)
      cy.get('#demo-tabpane-list .list-group-item')
        .first()
        .invoke('text')
        .should('not.eq', firstItemText)
    })
  })

  it('deve validar que todos os itens ainda estão presentes após reordenação', () => {
    SortablePage.getListItemTexts().then(initialOrder => {
      SortablePage.dragFirstToLast()

      // Verifica que o número de itens não mudou
      cy.get('#demo-tabpane-list .list-group-item')
        .should('have.length', initialOrder.length)
    })
  })
})
