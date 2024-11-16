import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DistributionCentreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    municipality_id: schema.number([
      rules.unsigned()
    ]),
    address_id: schema.number([
      rules.unsigned()
    ]),
    name_centre: schema.string(),
    phone: schema.string([
      rules.regex(/^\d+$/)
    ])
  })

  public messages: CustomMessages = {
    'municipality_id.required': 'El ID del municipio es obligatorio.',
    'municipality_id.unsigned': 'El ID del municipio debe ser un número positivo.',
    'address_id.required': 'El ID de la dirección es obligatorio.',
    'address_id.unsigned': 'El ID de la dirección debe ser un número positivo.',
    'name_centre.required': 'El nombre es obligatorio.',
    'phone.required': 'El teléfono es obligatorio.',
    'phone.regex': 'El teléfono solo puede contener números.'
  }
}
