import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartamentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name_departament: schema.string([
      rules.alpha()
    ]),
  })

  public messages: CustomMessages = {
    'name_departament.required': 'El nombre del departamento es obligatorio.',
    'name_departament.alpha': 'El nombre del departamento solo puede contener letras.'
  }
}
