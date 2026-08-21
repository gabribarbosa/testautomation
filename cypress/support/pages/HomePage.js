import selectors from '../../fixtures/selectors.json'

/**
 * Page Object para a tela Home (pós-login)
 * Encapsula seletores e ações disponíveis após autenticação
 */
class HomePage {
  getHomeLink() {
    return cy.get(selectors.home.homeLink)
  }

  getLogoutButton() {
    return cy.get(selectors.home.logoutButton)
  }

  logout() {
    cy.get(selectors.home.logoutButton).click()
  }

  isLoaded() {
    return cy.get(selectors.home.homeLink).should('be.visible')
  }
}

export default new HomePage()
