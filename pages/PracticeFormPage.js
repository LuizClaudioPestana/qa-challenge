class PracticeFormPage {
  visit() {
    cy.visit('/automation-practice-form')
    cy.dismissOverlays()
  }

  fillFirstName(name) {
    cy.get('#firstName').type(name)
  }

  fillLastName(name) {
    cy.get('#lastName').type(name)
  }

  fillEmail(email) {
    cy.get('#userEmail').type(email)
  }

  selectGender(gender) {
    // gender: 'Male', 'Female', 'Other'
    // Usa o atributo [for^="gender-radio"] para ser específico e independente de classes CSS
    cy.contains('[for^="gender-radio"]', gender).click({ force: true })
  }

  fillMobile(number) {
    cy.get('#userNumber').type(number)
  }

  setDateOfBirth(day, month, year) {
    cy.get('#dateOfBirthInput').click()
    cy.get('.react-datepicker__month-select').select(month)
    cy.get('.react-datepicker__year-select').select(year)
    cy.get(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`).click()
  }

  addSubject(subject) {
    cy.get('#subjectsInput').type(subject)
    cy.get('.subjects-auto-complete__option').first().click()
  }

  selectHobby(hobby) {
    // hobby: 'Sports', 'Reading', 'Music'
    cy.contains('.custom-checkbox', hobby).click({ force: true })
  }

  uploadPicture(fixture) {
    cy.get('#uploadPicture').selectFile(`cypress/fixtures/${fixture}`, { force: true })
  }

  fillAddress(address) {
    cy.get('#currentAddress').type(address)
  }

  selectState(state) {
    cy.get('#state').click({ force: true })
    cy.get('#react-select-3-option-0').click({ force: true })
  }

  selectCity(city) {
    cy.get('#city').click({ force: true })
    cy.get('#react-select-4-option-0').click({ force: true })
  }

  submit() {
    cy.get('#submit').scrollIntoView().click({ force: true })
  }

  getModal() {
    return cy.get('.modal-dialog')
  }

  closeModal() {
    cy.get('#closeLargeModal').click({ force: true })
  }
}

module.exports = new PracticeFormPage()
