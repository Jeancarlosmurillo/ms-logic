import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({ 
    license: schema.number([
    rules.unsigned(), // La licencia debe ser un número positivo
    rules.range(1, 99999999999999999999), // maximo 20 digitos de la licencia 
  ]),
  license_type: schema.enum(['B1', 'B2', 'B3','C1','C2','C3']),

    name: schema.string.optional({ trim: false }),
    email: schema.string.optional({ trim: false }, [
      rules.email(),
    ]),
    password: schema.string.optional({ trim: false }),
})

public messages:CustomMessages = {
  'license.required': 'El número de licencia es obligatorio',
  'license.unsigned': 'El número de licencia debe ser un número positivo',
  'license.maxLength': 'El numero de la licencia sobre pasa el maximo(20)',
  'license_type.enum': 'El tipo de licencia es obligatorio',
  'license_type.maxLength': 'El tipo de licencia es incorrecto',
  'user_id.required': 'El ID de usuario es obligatorio',
  'user_id.string': 'El usuario debe de ser un string',
  }
}

