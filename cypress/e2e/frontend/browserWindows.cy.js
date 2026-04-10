const BrowserWindowsPage = require('../../../pages/BrowserWindowsPage')

describe('Browser Windows', () => {
  beforeEach(() => {
    BrowserWindowsPage.visit()
  })

  it('deve validar botão New Window e conteúdo da página destino', () => {
    BrowserWindowsPage.assertNewWindowButtonExists()

    // Navega diretamente para a página que seria aberta na nova janela.
    // cy.stub(win, 'open') é evitado pois causa bad IPC com iframes cross-origin do demoqa.
    BrowserWindowsPage.visitSamplePage()
    BrowserWindowsPage.assertSamplePageContent('This is a sample page')
  })

  it('deve validar botão New Tab', () => {
    BrowserWindowsPage.assertNewTabButtonExists()
  })
})
