describe('Formulário de consultoria', () => {


    it('Deve solicitar consultoria individual', () => {
        cy.Start()
        cy.SubmitLoginform('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')
        //seguindo a automação sem usar o ID para um melhor aprendizado
        cy.get('input[placeholder="Digite seu nome completo"]').type('Maria Antonieta')
        cy.get('input[placeholder="Digite seu email"]').type('Antonieta@teste.com')

        //Aqui houve uma validação para saber se o campo estava sendo formatado corretamente após o cliente digitar os números
        cy.get('input[placeholder="(00) 00000-0000"]').type('11800028922')
            .should('have.value', '(11) 80002-8922')

        //Forma alternativa de interagir caso não tenha ID ou placeholder
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('In Company')


        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')


        cy.get('input[placeholder="000.000.000-00"]').type('60780967246')
            .should('have.value', '607.809.672-46')
    })

})