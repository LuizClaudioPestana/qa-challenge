const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const ProgressBarPage = require('../../../pages/ProgressBarPage')

Given('estou na página Progress Bar', () => {
  ProgressBarPage.visit()
})

When('inicio a barra de progresso', () => {
  ProgressBarPage.clickStartStop()
})

When('aguardo o progresso iniciar', () => {
  ProgressBarPage.waitUntilAtLeast(5)
})

When('paro a barra de progresso', () => {
  ProgressBarPage.clickStartStop()
})

Then('o valor da barra deve ser menor ou igual a {int}', max => {
  ProgressBarPage.assertValueLessThanOrEqual(max)
})

When('inicio a barra de progresso novamente', () => {
  ProgressBarPage.clickStartStop()
})

Then('a barra deve atingir 100%', () => {
  ProgressBarPage.waitUntil100()
})

When('clico em Reset', () => {
  ProgressBarPage.clickReset()
})

Then('o valor da barra deve ser {int}', expected => {
  ProgressBarPage.assertValue(expected)
})
