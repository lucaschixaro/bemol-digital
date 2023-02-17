/// <reference types="cypress" />

describe('Usuario', () => {
    it('Deve criar um usuário', () =>{
        cy.request({
            url: 'https://serverest.dev/usuarios',
            method: 'POST',
            body: {
            'nome': 'lucas-bemol',
            'email': 'lucasbemol@qa.com.br',
            'password':'teste',
            'administrador': 'true'
        }
        }).then(response => {
            expect(response.status).to.eq(201)
        })
        cy.request({
            url: 'https://serverest.dev/usuarios',
            method: 'GET',
            qs: {'nome':'lucas-bemol'}
        })
        .then(response => {
            expect(response.status).to.eq(200)
        // Validação a criação do usuários listando ele pelo nome
            expect(response.body.quantidade).to.equal(1)
        })
        // Delete do usuário para manter assertividade do teste e não sujar base de dados
        .its('body.usuarios[0]._id')
        .then((id) => {
            const url = `https://serverest.dev/usuarios/${id}`
            cy.request('DELETE', url)
        })
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.include('Registro excluído com sucesso')
        })
    })
})