const PracticeFormPage = require('../../../pages/PracticeFormPage')

describe('Practice Form', () => {
  beforeEach(() => {
    PracticeFormPage.visit()
  })

  it('deve preencher e submeter o formulário com sucesso', () => {
    PracticeFormPage.fillFirstName('John')
    PracticeFormPage.fillLastName('Doe')
    PracticeFormPage.fillEmail('john.doe@test.com')
    PracticeFormPage.selectGender('Male')
    PracticeFormPage.fillMobile('1234567890')
    PracticeFormPage.setDateOfBirth('15', 'January', '1990')
    PracticeFormPage.addSubject('Maths')
    PracticeFormPage.selectHobby('Sports')
    PracticeFormPage.uploadPicture('upload.txt')
    PracticeFormPage.fillAddress('123 Main Street, Test City')
    PracticeFormPage.selectState('NCR')
    PracticeFormPage.selectCity('Delhi')
    PracticeFormPage.submit()

    // Validar popup de confirmação
    PracticeFormPage.getModal().should('be.visible')
    cy.get('.modal-body').should('contain', 'John')
    cy.get('.modal-body').should('contain', 'Doe')

    // Fechar o popup
    PracticeFormPage.closeModal()
    PracticeFormPage.getModal().should('not.exist')
  })
})
