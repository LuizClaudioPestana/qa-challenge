describe('BookStore API — Fluxo Completo', () => {
  const user = {
    userName: `testUser_${Date.now()}`,
    password: 'Test@1234!'
  }

  it('deve criar usuário, autenticar, reservar livros e consultar detalhes', () => {
    // Step 1: Criar usuário
    cy.request({
      method: 'POST',
      url: '/Account/v1/User',
      body: user,
      failOnStatusCode: false
    }).then(resp => {
      expect(resp.status).to.eq(201)
      expect(resp.body).to.have.property('userID')
      cy.wrap(resp.body.userID).as('userId')
    })

    // Step 2: Gerar token JWT 
    cy.request({
      method: 'POST',
      url: '/Account/v1/GenerateToken',
      body: user
    }).then(resp => {
      expect(resp.status).to.eq(200)
      expect(resp.body.status).to.eq('Success')
      expect(resp.body.token).to.not.be.empty
      cy.wrap(resp.body.token).as('token')
    })

    // Step 3: Verificar autorização
    cy.request({
      method: 'POST',
      url: '/Account/v1/Authorized',
      body: user
    }).then(resp => {
      expect(resp.status).to.eq(200)
      expect(resp.body).to.eq(true)
    })

    // Step 4: Listar livros disponíveis
    cy.request('GET', '/BookStore/v1/Books').then(resp => {
      expect(resp.status).to.eq(200)
      expect(resp.body.books.length).to.be.greaterThan(1)
      cy.wrap(resp.body.books[0].isbn).as('isbn1')
      cy.wrap(resp.body.books[1].isbn).as('isbn2')
    })

    // Step 5: Reservar 2 livros
    cy.get('@userId').then(userId => {
      cy.get('@token').then(token => {
        cy.get('@isbn1').then(isbn1 => {
          cy.get('@isbn2').then(isbn2 => {
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
      })
    })

    // Step 6: Consultar usuário e validar livros reservados
    cy.get('@userId').then(userId => {
      cy.get('@token').then(token => {
        cy.get('@isbn1').then(isbn1 => {
          cy.get('@isbn2').then(isbn2 => {
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
      })
    })
  })
})
