import { schema, CustomMessages,rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ])
  })

  public messages: CustomMessages = {
     'user_id.required': 'El ID del usuario es obligatorio.',
    'user_id.unsigned': 'El ID del usuario debe ser un número positivo.'
  }
}

