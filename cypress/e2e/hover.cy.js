describe('Simulação Mouseover', () => {

    it('Deve mostrar um texto passa o mouse em cima do link do instagram', ()=> {
        cy.login()
        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')
    })
})