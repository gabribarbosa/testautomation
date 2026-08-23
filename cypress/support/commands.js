import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

/**
 * Performs login via UI using provided credentials
 * @param {string} email
 * @param {string} password
 */
Cypress.Commands.add('login', (email, password) => {
  LoginPage.visit()
  LoginPage.login(email, password)
})

/**
 * Performs login with the valid user defined in fixtures/users.json
 */
Cypress.Commands.add('loginAsValidUser', () => {
  cy.fixture('users').then(({ validUser }) => {
    cy.login(validUser.email, validUser.password)
  })
})

/**
 * Performs logout from Home screen
 */
Cypress.Commands.add('logout', () => {
  HomePage.logout()
})
