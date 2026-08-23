/**
 * Service Object to manage User API operations
 * Encapsulates all HTTP requests related to users
 */
class UserService {
  constructor() {
    this.baseUrl = 'https://serverest.dev'
    this.endpoint = '/usuarios'
  }

  /**
   * Registers a new user
   * @param {Object} userData - User data (nome, email, password, administrador)
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
   * Fetches a user by ID
   * @param {string} userId - User ID
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
   * Deletes a user by ID
   * @param {string} userId - User ID
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
