import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../../../support/pages/LoginPage'
import HomePage from '../../../support/pages/HomePage'

// Fixtures carregadas via alias para evitar hardcode
before(() => {
  cy.fixture('users').as('users')
  cy.fixture('messages').as('messages')
  
  // Cadastra o validUser via API antes dos testes para garantir que a conta existe
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
        cy.log('✅ Usuário cadastrado com sucesso para os testes de frontend')
      } else if (response.body.message === 'Este email já está sendo usado') {
        cy.log('⚠️ Usuário já existe, continuando com os testes')
      } else {
        cy.log('⚠️ Resposta inesperada no cadastro:', response.status, response.body)
      }
    })
  })
})

// ─── Contexto ────────────────────────────────────────────────────────────────

Given('que estou na página de login', () => {
  LoginPage.visit()
  LoginPage.getSubmitButton().should('be.visible')
})

Given('que estou autenticado na plataforma', () => {
  cy.loginAsValidUser()
  HomePage.isLoaded()
})

// ─── Ações ────────────────────────────────────────────────────────────────────

When('preencho o email com o usuário válido', function () {
  LoginPage.fillEmail(this.users.validUser.email)
})

When('preencho a senha com o usuário válido', function () {
  LoginPage.fillPassword(this.users.validUser.password)
})

When('preencho o email com {string}', (email) => {
  LoginPage.fillEmail(email)
})

When('preencho a senha com {string}', (password) => {
  LoginPage.fillPassword(password)
})

When('deixo o campo de email em branco', () => {
  LoginPage.getEmailInput().clear()
})

When('deixo o campo de senha em branco', () => {
  LoginPage.getPasswordInput().clear()
})

When('clico no botão Entrar', () => {
  LoginPage.submit()
})

When('clico no botão de logout', () => {
  HomePage.logout()
})

// ─── Assertivas ───────────────────────────────────────────────────────────────

Then('devo ser redirecionado para a home', () => {
  HomePage.isLoaded()
})

Then('o botão de logout deve estar visível', () => {
  HomePage.getLogoutButton().should('be.visible')
})

Then('devo ver a mensagem de credenciais inválidas', function () {
  cy.contains(this.messages.login.invalidCredentials).should('be.visible')
})

Then('devo ver a mensagem de email obrigatório', function () {
  cy.contains(this.messages.login.emptyEmail).should('be.visible')
})

Then('devo ver a mensagem de senha obrigatória', function () {
  cy.contains(this.messages.login.emptyPassword).should('be.visible')
})

Then('devo ser redirecionado para a página de login', () => {
  LoginPage.getSubmitButton().should('be.visible')
})

Then('o botão de logout não deve estar visível', () => {
  cy.get("[data-testid='logout']").should('not.exist')
})
