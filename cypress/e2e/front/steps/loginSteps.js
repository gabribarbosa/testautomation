import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../../support/pages/LoginPage'
import HomePage from '../../../support/pages/HomePage'

// Load fixtures via alias to avoid hardcoding
before(() => {
  cy.fixture('users').as('users')
  cy.fixture('messages').as('messages')
  
  // Register validUser via API before tests to ensure the account exists
  cy.fixture('users').then(({ validUser }) => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: 'Usuario Teste Frontend',
        email: validUser.email,
        password: validUser.password,
        administrador: 'true'
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        cy.log('✅ User successfully registered for frontend tests')
      } else if (response.body.message === 'Este email já está sendo usado') {
        cy.log('⚠️ User already exists, continuing with tests')
      } else {
        cy.log('⚠️ Unexpected registration response:', response.status, response.body)
      }
    })
  })
})

// ─── Background ──────────────────────────────────────────────────────────────

Given('I am on the login page', () => {
  LoginPage.visit()
  LoginPage.getSubmitButton().should('be.visible')
})

Given('I am authenticated on the platform', () => {
  cy.loginAsValidUser()
  HomePage.isLoaded()
})

// ─── Actions ─────────────────────────────────────────────────────────────────

When('I fill in the email with the valid user', function () {
  LoginPage.fillEmail(this.users.validUser.email)
})

When('I fill in the password with the valid user', function () {
  LoginPage.fillPassword(this.users.validUser.password)
})

When('I fill in the email with {string}', (email) => {
  LoginPage.fillEmail(email)
})

When('I fill in the password with {string}', (password) => {
  LoginPage.fillPassword(password)
})

When('I leave the email field blank', () => {
  LoginPage.getEmailInput().clear()
})

When('I leave the password field blank', () => {
  LoginPage.getPasswordInput().clear()
})

When('I click the Login button', () => {
  LoginPage.submit()
})

When('I click the logout button', () => {
  HomePage.logout()
})

// ─── Assertions ──────────────────────────────────────────────────────────────

Then('I should be redirected to the home page', () => {
  HomePage.isLoaded()
})

Then('the logout button should be visible', () => {
  HomePage.getLogoutButton().should('be.visible')
})

Then('I should see the invalid credentials message', function () {
  cy.contains(this.messages.login.invalidCredentials).should('be.visible')
})

Then('I should see the required email message', function () {
  cy.contains(this.messages.login.emptyEmail).should('be.visible')
})

Then('I should see the required password message', function () {
  cy.contains(this.messages.login.emptyPassword).should('be.visible')
})

Then('I should be redirected to the login page', () => {
  LoginPage.getSubmitButton().should('be.visible')
})

Then('the logout button should not be visible', () => {
  cy.get("[data-testid='logout']").should('not.exist')
})
