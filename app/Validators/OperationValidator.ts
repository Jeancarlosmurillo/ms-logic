import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    municipality_id: schema.number([
      rules.unsigned()
    ]),
    vehicle_id: schema.number([
      rules.unsigned()
    ])
  })

  public messages: CustomMessages = {
    'municipality_id.required': 'El ID del municipio es obligatorio.',
    'municipality_id.unsigned': 'El ID del municipio debe ser un número positivo.',
    'vehicle_id.required': 'El ID del vehículo es obligatorio.',
    'vehicle_id.unsigned': 'El ID del vehículo debe ser un número positivo.'
  }
}
