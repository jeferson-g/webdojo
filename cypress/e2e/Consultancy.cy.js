describe('Formulário de consultoria', () => {


    it('Deve solicitar consultoria individual', () => {
        cy.Start()
        cy.SubmitLoginform('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')
    })

})