import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    company_id: schema.number.optional([
      rules.exists({ table: 'companies', column: 'id' }), // Verifica que la empresa exista
      rules.unsigned(), // Debe ser un número positivo
    ]),
    person_id: schema.number.optional([
      rules.exists({ table: 'natural_people', column: 'id' }), // Verifica que la persona exista
      rules.unsigned(), // Debe ser un número positivo
    ]),
  })

  public messages: CustomMessages = {
    'company_id.exists': 'El ID de la empresa no existe en la base de datos.',
    'company_id.unsigned': 'El ID de la empresa debe ser un número positivo.',
    'person_id.exists': 'El ID de la persona no existe en la base de datos.',
    'person_id.unsigned': 'El ID de la persona debe ser un número positivo.',
  }

  /**
   * Validación personalizada para asegurar que al menos uno de los campos sea enviado
   */
  public async validate(payload: any) {
    const { company_id, person_id } = payload

    if (!company_id && !person_id) {
      throw new Error(
        'Debes proporcionar un "company_id" si es una empresa o un "person_id" si es una persona natural.'
      )
    }

    if (company_id && person_id) {
      throw new Error(
        'Solo uno de los campos, "company_id" o "person_id", debe ser proporcionado, no ambos.'
      )
    }
  }
}

