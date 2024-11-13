import { schema, CustomMessages,rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    municipality_id: schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ]),
      vehicle_id:schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ]),

  })

  public messages: CustomMessages = {}
}