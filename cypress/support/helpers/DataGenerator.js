import { faker } from '@faker-js/faker'

/**
 * Gerador de dados dinâmicos para testes usando Faker
 */
class DataGenerator {
  /**
   * Gera dados completos de um usuário
   * @param {boolean} isAdmin - Se o usuário é administrador
   * @returns {Object} Objeto com nome, email, password e administrador
   */
  generateUserData(isAdmin = true) {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 8 }),
      administrador: isAdmin ? 'true' : 'false'
    }
  }

  /**
   * Gera apenas um email único
   * @returns {string}
   */
  generateEmail() {
    return faker.internet.email().toLowerCase()
  }

  /**
   * Gera apenas um nome completo
   * @returns {string}
   */
  generateName() {
    return faker.person.fullName()
  }
}

export default new DataGenerator()
