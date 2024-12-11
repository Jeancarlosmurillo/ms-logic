import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NaturalPersonValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    user_id: schema.string(),
    name: schema.string.optional({ trim: false }),
    email: schema.string.optional({ trim: false }, [
      rules.email(),
    ]),
    password: schema.string.optional({ trim: false }),
  })

  public messages: CustomMessages = {
    'document_type.required': 'El tipo de documento es obligatorio',
    'document_type.maxLength': 'El tipo de documento no puede exceder los 255 caracteres',

    'document_number.required': 'El número de documento es obligatorio',
    'document_number.maxLength': 'El número de documento no puede exceder los 20 caracteres',

    'born_date.required': 'La fecha de nacimiento es obligatoria',
    'born_date.before': 'La fecha de nacimiento debe ser anterior a hoy',

    'company_id.unsigned': 'El ID de la empresa debe ser un número entero positivo',
    'company_id.exists': 'El ID de la empresa no existe en la base de datos',

    'customer_id.required': 'El ID del cliente es obligatorio',
    'customer_id.unsigned': 'El ID del cliente debe ser un número entero positivo',
    'customer_id.exists': 'El ID del cliente no existe en la base de datos',
  }
}
