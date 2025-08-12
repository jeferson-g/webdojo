describe('Login', () => {
  it('Deve realizar o login com sucesso', () => {
    cy.Start()
    cy.SubmitLoginform('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

  })

  it('NÃO deve logar com senha inválida', () => {
    cy.Start()
    cy.SubmitLoginform('papito@webdojo.com', 'XXX')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('NÃO deve logar com email não cadastrado', () => {
    cy.Start()
    cy.SubmitLoginform('404@webdojo.com', 'katana123')

    cy.contains('button', 'Entrar').click()

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})