import { schema, CustomMessages,rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DistributionCentreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    municipality_id: schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ]),
    address_id:schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ]),
    name: schema.string([ rules.alpha()]),
    phone:schema.string([
        rules.regex(/^\d+$/)  // Solo permite números del 0 al 9
      ])

  })

  public messages: CustomMessages = {}
}
