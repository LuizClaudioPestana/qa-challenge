const { Given, When, Then, Before } = require('@badeball/cypress-cucumber-preprocessor')

let userId, token, isbn1, isbn2
const user = {
  userName: `bddUser_${Date.now()}`,
  password: 'Test@1234!'
}

Before(() => {
  userId = undefined
  token = undefined
  isbn1 = undefined
  isbn2 = undefined
})

Given('que crio um novo usuário na API', () => {
  cy.request({
    method: 'POST',
    url: '/Account/v1/User',
    body: user,
    failOnStatusCode: false
  }).then(resp => {
    expect(resp.status).to.eq(201)
    userId = resp.body.userID
  })
})

When('gero um token de acesso para o usuário', () => {
  cy.request({
    method: 'POST',
    url: '/Account/v1/GenerateToken',
    body: user
  }).then(resp => {
    expect(resp.body.status).to.eq('Success')
    token = resp.body.token
  })
})

Then('o usuário deve estar autorizado', () => {
  cy.request({
    method: 'POST',
    url: '/Account/v1/Authorized',
    body: user
  }).then(resp => {
    expect(resp.status).to.eq(200)
    expect(resp.body).to.eq(true)
  })
})

When('listo os livros disponíveis na BookStore', () => {
  cy.request('GET', '/BookStore/v1/Books').then(resp => {
    expect(resp.status).to.eq(200)
    expect(resp.body.books.length).to.be.greaterThan(1)
    isbn1 = resp.body.books[0].isbn
    isbn2 = resp.body.books[1].isbn
  })
})

When('reservo os 2 primeiros livros para o usuário', () => {
  cy.then(() => {
    cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        userId,
        collectionOfIsbns: [{ isbn: isbn1 }, { isbn: isbn2 }]
      }
    }).then(resp => {
      expect(resp.status).to.eq(201)
    })
  })
})

Then('os livros devem aparecer no perfil do usuário', () => {
  cy.then(() => {
    cy.request({
      method: 'GET',
      url: `/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then(resp => {
      expect(resp.status).to.eq(200)
      expect(resp.body.books).to.have.length(2)
      const reservedIsbns = resp.body.books.map(b => b.isbn)
      expect(reservedIsbns).to.include(isbn1)
      expect(reservedIsbns).to.include(isbn2)
    })
  })
})
