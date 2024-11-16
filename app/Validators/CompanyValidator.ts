import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompanyValidator {
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
    
    name_company: schema.string({}, [
      rules.minLength(3), // Mínimo 3 caracteres para el nombre
      rules.maxLength(255), // Máximo 255 caracteres
    ]),

    person_id: schema.number([
      rules.exists({ table: 'persons', column: 'id' }), // Verifica que exista en la tabla de personas
      rules.unsigned(), // Debe ser positivo
    ]),


  })


  
  public messages: CustomMessages = {}
}
