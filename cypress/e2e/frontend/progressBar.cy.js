const ProgressBarPage = require('../../../pages/ProgressBarPage')

describe('Progress Bar', () => {
  beforeEach(() => {
    ProgressBarPage.visit()
  })

  it('deve parar antes de 25%, validar valor, atingir 100% e resetar', () => {
    // Iniciar e parar antes de 25%
    ProgressBarPage.clickStartStop()

    // Aguarda atingir pelo menos 5% para ter certeza que iniciou
    ProgressBarPage.waitUntilAtLeast(5)

    // Para antes de atingir 25%
    ProgressBarPage.clickStartStop()

    // Valida que o valor é <= 25
    ProgressBarPage.assertValueLessThanOrEqual(25)

    // Reiniciar e aguardar 100%
    ProgressBarPage.clickStartStop()
    ProgressBarPage.waitUntil100()

    // Resetar
    ProgressBarPage.clickReset()
    ProgressBarPage.assertValue(0)
  })
})
