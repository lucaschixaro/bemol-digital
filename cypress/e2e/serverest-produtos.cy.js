/// <reference types="cypress" />

describe('Usuario', () => {
    // Armazena token para efetuar o cadastro do produto
    let token
    beforeEach(() => {
        cy.request({
            url: 'https://serverest.dev/usuarios',
            method: 'POST',
            body: {
            'nome': 'lucas',
            'email': 'lucas@qa.com.br',
            'password':'teste',
            'administrador': 'true'
        }
        })
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                'email': 'lucas@qa.com.br',
                'password': 'teste'
            }
        }).then((response) => {
            token = response.body.authorization
        })
    })
    it('Deve cadastrar um produto novo', () => {
        let productId
        cy.request({
            url: 'https://serverest.dev/produtos',
            method: 'POST',
            headers: {
                'Authorization': `${token}`
            },
            body: {
                'nome': 'Razer Viper Ultimate',
                'preco': '500',
                'descricao': 'Mouse',
                'quantidade': 10
            }
        }).then((response) => {
            productId = response.body._id
            const url = `https://serverest.dev/produtos/${productId}`
            cy.request('GET', url)
        }).then(response => {
            // Valida a criação do produto listando pelo ID
            expect(response.status).to.eq(200)
            expect(response.body.nome).to.include('Razer Viper Ultimate')
            // Delete o produto para manter assertividade do teste e não sujar base de dados
        }).then((response) => {
            productId = response.body._id
            const url = `https://serverest.dev/produtos/${productId}`
            cy.request({ 
            method: 'DELETE', 
            url, 
            headers: {
                'Authorization': `${token}`
            }
        })
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.include('Registro excluído com sucesso')
        })
    })
})