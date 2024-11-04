import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
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
    name: schema.string([
      rules.alphaNum({
        allow: ['space', 'underscore', 'dash']
      }),
      rules.minLength(2),
      rules.maxLength(100),
    ]),
    description: schema.string([
      rules.alphaNum({
        allow: ['space', 'underscore', 'dash']
      }),
      rules.minLength(2),
      rules.maxLength(100),
    ]),
    price: schema.number([
      rules.range(1, 1000000)
    ]),
    cuantity: schema.number([
      rules.range(1, 1000)
    ])
  })

  public messages: CustomMessages = {}
}




 
 