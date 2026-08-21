import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

/**
 * Realiza login via UI usando as credenciais fornecidas
 * @param {string} email
 * @param {string} password
 */
Cypress.Commands.add('login', (email, password) => {
  LoginPage.visit()
  LoginPage.login(email, password)
})

/**
 * Realiza login com o usuário válido definido em fixtures/users.json
 */
Cypress.Commands.add('loginAsValidUser', () => {
  cy.fixture('users').then(({ validUser }) => {
    cy.login(validUser.email, validUser.password)
  })
})

/**
 * Realiza logout a partir da tela Home
 */
Cypress.Commands.add('logout', () => {
  HomePage.logout()
})