import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipalityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name_municipality: schema.string(),
    departament_id: schema.number([
      rules.unsigned()
    ])
  })

  public messages: CustomMessages = {
    'name_municipality.required': 'El nombre del municipio es obligatorio.',
    'name_municipality.alpha': 'El nombre del municipio solo puede contener letras.',
    'departament_id.required': 'El ID del departamento es obligatorio.',
    'departament_id.unsigned': 'El ID del departamento debe ser un número positivo.'
  }
}
