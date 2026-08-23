import selectors from '../../fixtures/selectors.json'

/**
 * Page Object for Home screen (post-login)
 * Encapsulates selectors and actions available after authentication
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
