import { schema, CustomMessages,rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipalityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name_municipality: schema.string([ rules.alpha()]),
    departament_id: schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ])
  })

  public messages: CustomMessages = {}
}
