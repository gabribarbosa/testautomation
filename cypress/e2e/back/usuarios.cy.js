import UserService from '../../support/services/UserService.js'
import DataGenerator from '../../support/helpers/DataGenerator.js'
import SchemaValidator from '../../support/helpers/SchemaValidator.js'

describe('API de Usuários - Fluxo Completo', () => {
  let createdUserId
  let userData
  let schemas
  let responses

  before(() => {
    // Carrega fixtures
    cy.fixture('schemas').then((data) => {
      schemas = data
    })
    cy.fixture('responses').then((data) => {
      responses = data
    })
  })

  describe('POST /usuarios - Cadastro', () => {
    it('Deve cadastrar um novo usuário com sucesso', () => {
      // Gera dados dinâmicos com Faker
      userData = DataGenerator.generateUserData(true)
      cy.log('Dados gerados:', JSON.stringify(userData))

      UserService.register(userData).then((response) => {
        // Valida status code
        expect(response.status).to.equal(201)

        // Valida mensagem de sucesso
        expect(response.body.message).to.equal(responses.register.message)

        // Valida que retornou o ID
        expect(response.body).to.have.property('_id')
        expect(response.body._id).to.be.a('string').and.not.be.empty

        // Valida schema da resposta
        const isValid = SchemaValidator.validate(response.body, schemas.registerSuccess)
        expect(isValid).to.be.true

        // Armazena o ID para uso nos próximos testes
        createdUserId = response.body._id
        cy.log(`✅ Usuário criado com ID: ${createdUserId}`)
      })
    })
  })

  describe('GET /usuarios/:id - Busca', () => {
    it('Deve buscar um usuário por ID válido', () => {
      expect(createdUserId).to.exist

      UserService.getById(createdUserId).then((response) => {
        // Valida status code
        expect(response.status).to.equal(200)

        // Valida que retornou todos os dados do usuário
        expect(response.body).to.have.property('nome', userData.nome)
        expect(response.body).to.have.property('email', userData.email)
        expect(response.body).to.have.property('password', userData.password)
        expect(response.body).to.have.property('administrador', userData.administrador)
        expect(response.body).to.have.property('_id', createdUserId)

        // Valida schema da resposta
        const isValid = SchemaValidator.validate(response.body, schemas.getUserSuccess)
        expect(isValid).to.be.true

        cy.log('✅ Usuário encontrado e schema validado')
      })
    })

    it('Deve retornar erro ao buscar usuário com ID inválido', () => {
      const invalidId = 'id-inexistente-12345'

      UserService.getById(invalidId).then((response) => {
        // Valida status code de erro
        expect(response.status).to.equal(400)

        // Valida mensagem de erro
        expect(response.body).to.have.property('id')
        expect(response.body.id).to.include('16 caracteres')

        // Valida schema da resposta de erro
        const isValid = SchemaValidator.validate(response.body, schemas.userNotFound)
        expect(isValid).to.be.true

        cy.log('✅ Erro de ID inválido validado')
      })
    })
  })

  describe('DELETE /usuarios/:id - Exclusão', () => {
    it('Deve deletar um usuário por ID válido', () => {
      expect(createdUserId).to.exist

      UserService.delete(createdUserId).then((response) => {
        // Valida status code
        expect(response.status).to.equal(200)

        // Valida mensagem de exclusão
        expect(response.body.message).to.equal(responses.delete.message)

        // Valida schema da resposta
        const isValid = SchemaValidator.validate(response.body, schemas.deleteSuccess)
        expect(isValid).to.be.true

        cy.log(`✅ Usuário ${createdUserId} deletado com sucesso`)
      })
    })

    it('Deve confirmar que o usuário foi deletado (GET após DELETE)', () => {
      UserService.getById(createdUserId).then((response) => {
        // Valida que o usuário não existe mais
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal('Usuário não encontrado')

        cy.log('✅ Confirmado: usuário não existe mais após exclusão')
      })
    })
  })
})
