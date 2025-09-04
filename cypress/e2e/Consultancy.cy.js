describe('Formulário de consultoria', () => {

    beforeEach(()=>{
        cy.Start()
        cy.SubmitLoginform('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria') 
    })

    it.only('Deve solicitar consultoria individual', () => {

        //seguindo a automação sem usar o ID para um melhor aprendizado
        cy.get('input[placeholder="Digite seu nome completo"]').type('Maria Antonieta')
        cy.get('input[placeholder="Digite seu email"]').type('Antonieta@teste.com')

        //Aqui houve uma validação para saber se o campo estava sendo formatado corretamente após o cliente digitar os números.
        cy.get('input[placeholder="(00) 00000-0000"]').type('11800028922')
            .should('have.value', '(11) 80002-8922')

        //Forma alternativa de interagir caso não tenha ID ou placeholder.
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

        //Aqui por melhor prática, é essencial criar um arraw e um loop para evitar as repetições de código.

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        //Devido ao botão estar com o elemento "hidden", o cypress não aceita a interação necessitando de usar o "force:true"
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/testfile.pdf', { force: true })


        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s')


        const techs = [
            'Cypress',
            'Selenium',
            'Robot Framework'
        ]

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        //     .should('be.visible')

    })

    it('Deve verificar os campos obrigatórios', () => {
        cy.Start()
        cy.SubmitLoginform('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        cy.contains('button', 'Enviar formulário')
            .click()

        //Nova versão liberada, foi realizado uma alteração nas mensagens obrigatorias.  
        cy.contains('label', 'Nome Completo')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
    })

    afterEach(()=> {
        cy.log('Teste aftereach, acontece a CADA TESTE')
    })

    after(() => {
       cy.log('Teste after, Isso acontece depois de TODOS OS TESTES uma única vez') 
    })

})