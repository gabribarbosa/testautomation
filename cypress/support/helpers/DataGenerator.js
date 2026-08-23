import { faker } from '@faker-js/faker'

/**
 * Dynamic data generator for tests using Faker
 */
class DataGenerator {
  /**
   * Generates complete user data
   * @param {boolean} isAdmin - Whether the user is an admin
   * @returns {Object} Object with nome, email, password, and administrador
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
   * Generates a unique email only
   * @returns {string}
   */
  generateEmail() {
    return faker.internet.email().toLowerCase()
  }

  /**
   * Generates a full name only
   * @returns {string}
   */
  generateName() {
    return faker.person.fullName()
  }
}

export default new DataGenerator()
