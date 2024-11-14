import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    user_id: schema.number([
      rules.exists({ table: 'users', column: 'id' }), // Verifica que el `user_id` exista en la tabla `users`
      rules.unsigned(), // Asegura que el `user_id` sea un número positivo
    ]),
  })

  public messages:CustomMessages = {
    'user_id.required': 'El ID del usuario es obligatorio',
    'user_id.exists': 'El usuario especificado no existe',
    'user_id.unsigned': 'El ID del usuario debe ser un número positivo',}
}
