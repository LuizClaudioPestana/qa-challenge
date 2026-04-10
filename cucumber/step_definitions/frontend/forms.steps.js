const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const PracticeFormPage = require('../../../pages/PracticeFormPage')

Given('estou na página Practice Form', () => {
  PracticeFormPage.visit()
})

When('preencho o nome {string} e sobrenome {string}', (firstName, lastName) => {
  PracticeFormPage.fillFirstName(firstName)
  PracticeFormPage.fillLastName(lastName)
})

When('preencho o email {string}', email => {
  PracticeFormPage.fillEmail(email)
})

When('seleciono o gênero {string}', gender => {
  PracticeFormPage.selectGender(gender)
})

When('preencho o celular {string}', number => {
  PracticeFormPage.fillMobile(number)
})

When('defino a data de nascimento para {string} de {string} de {string}', (day, month, year) => {
  PracticeFormPage.setDateOfBirth(day, month, year)
})

When('adiciono a matéria {string}', subject => {
  PracticeFormPage.addSubject(subject)
})

When('seleciono o hobby {string}', hobby => {
  PracticeFormPage.selectHobby(hobby)
})

When('faço upload do arquivo {string}', fixture => {
  PracticeFormPage.uploadPicture(fixture)
})

When('preencho o endereço {string}', address => {
  PracticeFormPage.fillAddress(address)
})

When('seleciono o estado e a cidade', () => {
  PracticeFormPage.selectState()
  PracticeFormPage.selectCity()
})

When('submeto o formulário', () => {
  PracticeFormPage.submit()
})

Then('o popup de confirmação deve ser exibido com o nome {string}', name => {
  PracticeFormPage.getModal().should('be.visible')
  cy.get('.modal-body').should('contain', name)
})

When('fecho o popup', () => {
  PracticeFormPage.closeModal()
})

Then('o popup deve ser fechado', () => {
  PracticeFormPage.getModal().should('not.exist')
})
