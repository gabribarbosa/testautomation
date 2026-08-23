/**
 * Service Object para gerenciar operações da API de Usuários
 * Encapsula todas as requisições HTTP relacionadas a usuários
 */
class UserService {
  constructor() {
    this.baseUrl = 'https://serverest.dev'
    this.endpoint = '/usuarios'
  }

  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário (nome, email, password, administrador)
   * @returns {Cypress.Chainable}
   */
  register(userData) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}${this.endpoint}`,
      body: userData,
      failOnStatusCode: false
    })
  }

  /**
   * Busca um usuário por ID
   * @param {string} userId - ID do usuário
   * @returns {Cypress.Chainable}
   */
  getById(userId) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${this.endpoint}/${userId}`,
      failOnStatusCode: false
    })
  }

  /**
   * Remove um usuário por ID
   * @param {string} userId - ID do usuário
   * @returns {Cypress.Chainable}
   */
  delete(userId) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}${this.endpoint}/${userId}`,
      failOnStatusCode: false
    })
  }
}

export default new UserService()
