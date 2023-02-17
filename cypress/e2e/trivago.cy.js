/// <reference types="cypress" />

// TODO: Trocar selector pelo ID das classes para melhorar funcionamento e assertividade do teste //

describe('Dado que quero encontrar hostéis na Trivago para o destino Manaus', () => {
      it('Então deve pesquisar destino Manaus', () => {
            cy.visit('https://www.trivago.com.br', {
                  headers: {
                        'accept': 'application/json, text/plain, */*',
                        'user-agent': 'axios/0.27.2'
                  }
            });
            cy.get('[data-testid="search-form-destination"]')
                  .type('Manaus', { force: true })

            cy.wait(3000)
            cy.get('#suggestion-list > ul > li:nth-child(1) > div')
                  .click({ force: true })
            cy.get('[data-testid="quick-links-index-tonight"]')
                  .click({ force: true })
            cy.get('[data-testid="guest-selector"]')
                  .click()
            cy.get('[data-testid="search-button"]')
                  .click({ force: true })
            cy.get('[id="sorting-selector"]')
                  .click()
            cy.get('option[value="6"]')
                  .click()
            cy.get('[data-testid="item-name"]').first('')

      })
})