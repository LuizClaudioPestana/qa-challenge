class SortablePage {
  visit() {
    cy.visit('/sortable')
    cy.dismissOverlays()
  }

  getListItems() {
    return cy.get('#demo-tabpane-list .list-group-item')
  }

  getListItemTexts() {
    return this.getListItems().then($items =>
      [...$items].map(el => el.innerText.trim())
    )
  }

  dragItemToPosition(sourceIndex, targetIndex) {
    this.getListItems().eq(sourceIndex).then($source => {
      this.getListItems().eq(targetIndex).then($target => {
        cy.wrap($source).drag(cy.wrap($target))
      })
    })
  }

  dragLastToFirst() {
    cy.get('#demo-tabpane-list .list-group-item').last()
      .drag('#demo-tabpane-list .list-group-item:first-child')
  }

  dragFirstToLast() {
    cy.get('#demo-tabpane-list .list-group-item').first()
      .drag('#demo-tabpane-list .list-group-item:last-child')
  }
}

module.exports = new SortablePage()
