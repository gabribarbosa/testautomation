import Ajv from 'ajv'
import addFormats from 'ajv-formats'

/**
 * Validador de schemas JSON usando AJV
 */
class SchemaValidator {
  constructor() {
    this.ajv = new Ajv({ allErrors: true, verbose: true })
    addFormats(this.ajv)
  }

  /**
   * Valida um objeto contra um schema
   * @param {Object} data - Dados a serem validados
   * @param {Object} schema - Schema JSON para validação
   * @returns {boolean} - true se válido, lança erro se inválido
   */
  validate(data, schema) {
    const validate = this.ajv.compile(schema)
    const valid = validate(data)

    if (!valid) {
      const errors = validate.errors
        .map(err => `${err.instancePath} ${err.message}`)
        .join(', ')
      
      throw new Error(`Schema validation failed: ${errors}`)
    }

    return valid
  }
}

export default new SchemaValidator()
