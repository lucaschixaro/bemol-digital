/// <reference types="cypress" />

// TODO: Trocar selector pelo ID das classes para melhorar funcionamento e assertividade do teste //

describe('Dado que quero encontrar o endereço da Loja Bemol pelo CEP', () => {
  it('Então deve pesquisar pelo CEP 69058-833 no site dos Correios', () => {
    cy.visit('http://www.buscacep.correios.com.br')

    // Digitar em um elemento do tipo input
    cy.get('input[name="endereco"]')
      .type('69005-040')

    // Validações das labels da lista suspensa do tipo do CEP
    cy.get('option[value="LOG"]')
      .should('have.text', 'Localidade/Logradouro')

    cy.get('option[value="PRO"]')
      .should('have.text', 'CEP Promocional')

    cy.get('option[value="CPC"]')
      .should('have.text', 'Caixa Postal Comunitária')

    cy.get('option[value="GRU"]')
      .should('have.text', 'Grande Usuário')

    cy.get('option[value="UOP"]')
      .should('have.text', 'Unidade Operacional')

    cy.get('option[value="ALL"]')
      .should('have.text', 'Todos')

    // Clique no botão pesquisar
    cy.get('button[name="btn_pesquisar"]')
      .click()

    // Assert dos dados pesquisados pelo CEP
    cy.get('tbody > tr > [data-th="Logradouro/Nome"]')
      .should('contain', 'Rua Miranda Leão')

    cy.get('tbody > tr > [data-th="Bairro/Distrito"]')
      .should('contain', 'Centro')

    cy.get('tbody > tr > [data-th="Localidade/UF"]')
      .should('contain', 'Manaus/AM')

    cy.get('tbody > tr > [data-th="CEP"]')
      .should('contain', '69005-040')
  })
})
