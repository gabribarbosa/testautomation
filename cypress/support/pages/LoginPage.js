import selectors from '../../fixtures/selectors.json'

/**
 * Page Object para a tela de Login
 * Encapsula todos os seletores e ações relacionadas à autenticação
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
   * Realiza o fluxo completo de login
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
