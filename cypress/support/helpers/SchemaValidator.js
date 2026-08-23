import Ajv from 'ajv'
import addFormats from 'ajv-formats'

/**
 * JSON schema validator using AJV
 */
class SchemaValidator {
  constructor() {
    this.ajv = new Ajv({ allErrors: true, verbose: true })
    addFormats(this.ajv)
  }

  /**
   * Validates an object against a schema
   * @param {Object} data - Data to be validated
   * @param {Object} schema - JSON schema for validation
   * @returns {boolean} - true if valid, throws error if invalid
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
