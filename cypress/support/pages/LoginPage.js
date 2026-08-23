import selectors from '../../fixtures/selectors.json'

/**
 * Page Object for Login screen
 * Encapsulates all selectors and actions related to authentication
 */
class LoginPage {
  visit() {
    cy.visit('/')
  }

  fillEmail(email) {
    cy.get(selectors.login.emailInput).clear().type(email)
  }

  fillPassword(password) {
    cy.get(selectors.login.passwordInput).clear().type(password)
  }

  submit() {
    cy.get(selectors.login.submitButton).click()
  }

  /**
   * Performs complete login flow
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.submit()
  }

  getEmailInput() {
    return cy.get(selectors.login.emailInput)
  }

  getPasswordInput() {
    return cy.get(selectors.login.passwordInput)
  }

  getSubmitButton() {
    return cy.get(selectors.login.submitButton)
  }
}

export default new LoginPage()
