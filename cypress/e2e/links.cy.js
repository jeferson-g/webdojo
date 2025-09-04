describe('Abertura de nova janela por links', ()=> {

    it('Validando hyperlink do instagram', ()=> {
        cy.login()

        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')
    })

    it.only('Acessa o link de termos de uso removendo o tagert blank', ()=> {
        cy.Start()
        cy.SubmitLoginform('papito@webdojo.com', 'katana123')

        cy.contains('Formulários').click()

        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('1. Aceitação dos Termos')
            .should('be.visible')
    })
})