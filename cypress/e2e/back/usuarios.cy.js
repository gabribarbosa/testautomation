import UserService from '../../support/services/UserService.js'
import DataGenerator from '../../support/helpers/DataGenerator.js'
import SchemaValidator from '../../support/helpers/SchemaValidator.js'

describe('Users API - Complete Flow', () => {
  let createdUserId
  let userData
  let schemas
  let responses

  before(() => {
    // Load fixtures
    cy.fixture('schemas').then((data) => {
      schemas = data
    })
    cy.fixture('responses').then((data) => {
      responses = data
    })
  })

  describe('POST /usuarios - Registration', () => {
    it('Should register a new user successfully', () => {
      // Generate dynamic data with Faker
      userData = DataGenerator.generateUserData(true)
      cy.log('Generated data:', JSON.stringify(userData))

      UserService.register(userData).then((response) => {
        // Validate status code
        expect(response.status).to.equal(201)

        // Validate success message
        expect(response.body.message).to.equal(responses.register.message)

        // Validate that ID was returned
        expect(response.body).to.have.property('_id')
        expect(response.body._id).to.be.a('string').and.not.be.empty

        // Validate response schema
        const isValid = SchemaValidator.validate(response.body, schemas.registerSuccess)
        expect(isValid).to.be.true

        // Store ID for use in subsequent tests
        createdUserId = response.body._id
        cy.log(`✅ User created with ID: ${createdUserId}`)
      })
    })
  })

  describe('GET /usuarios/:id - Search', () => {
    it('Should fetch a user by valid ID', () => {
      expect(createdUserId).to.exist

      UserService.getById(createdUserId).then((response) => {
        // Validate status code
        expect(response.status).to.equal(200)

        // Validate that all user data was returned
        expect(response.body).to.have.property('nome', userData.nome)
        expect(response.body).to.have.property('email', userData.email)
        expect(response.body).to.have.property('password', userData.password)
        expect(response.body).to.have.property('administrador', userData.administrador)
        expect(response.body).to.have.property('_id', createdUserId)

        // Validate response schema
        const isValid = SchemaValidator.validate(response.body, schemas.getUserSuccess)
        expect(isValid).to.be.true

        cy.log('✅ User found and schema validated')
      })
    })

    it('Should return error when searching for user with invalid ID', () => {
      const invalidId = 'id-inexistente-12345'

      UserService.getById(invalidId).then((response) => {
        // Validate error status code
        expect(response.status).to.equal(400)

        // Validate error message
        expect(response.body).to.have.property('id')
        expect(response.body.id).to.include('16 caracteres')

        // Validate error response schema
        const isValid = SchemaValidator.validate(response.body, schemas.userNotFound)
        expect(isValid).to.be.true

        cy.log('✅ Invalid ID error validated')
      })
    })
  })

  describe('DELETE /usuarios/:id - Deletion', () => {
    it('Should delete a user by valid ID', () => {
      expect(createdUserId).to.exist

      UserService.delete(createdUserId).then((response) => {
        // Validate status code
        expect(response.status).to.equal(200)

        // Validate deletion message
        expect(response.body.message).to.equal(responses.delete.message)

        // Validate response schema
        const isValid = SchemaValidator.validate(response.body, schemas.deleteSuccess)
        expect(isValid).to.be.true

        cy.log(`✅ User ${createdUserId} deleted successfully`)
      })
    })

    it('Should confirm that user was deleted (GET after DELETE)', () => {
      UserService.getById(createdUserId).then((response) => {
        // Validate that user no longer exists
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal('Usuário não encontrado')

        cy.log('✅ Confirmed: user no longer exists after deletion')
      })
    })
  })
})
