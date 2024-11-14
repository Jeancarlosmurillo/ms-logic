import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    
   *     schema.string([ rules.alpha() ])
   *    
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *       
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    
   */
  public schema = schema.create({
      user_id: schema.number.optional([
        rules.unique({
          table: "users",
          column: "id",
          where: { id: this.ctx.request.input("id") },
        }),
      ]),
    name: schema.string([ rules.alpha()]),
    last_name: schema.string([ rules.alpha()]),
    email: schema.string([
        rules.email(),
        rules.unique({ table: 'users', column: 'email' })
      ]),
    phone:schema.string([
        rules.regex(/^\d+$/)  // Solo permite números del 0 al 9
      ])

    // rol: schema.string(),
            
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation (.)
   * for targeting nested fields and array expressions (*) for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "name.required": "El campo name es requerido",
    "last_name.required": "El campo last_name es requerido",
    "email.required": "El campo email es requerido",
    "email.email": "El campo email debe ser un correo válido",
    "phone.required": "El campo phone es requerido",
    "phone.mobile": "El campo phone debe ser un número de teléfono válido",
  }
}