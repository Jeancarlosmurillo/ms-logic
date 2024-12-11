import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone_number: schema.number([rules.required()]),
    user_id: schema.string([rules.required()]),
  })

  public messages: CustomMessages = {
    "phone_number.required": "El número de teléfono es obligatorio.",
    "phone_number.range":
      "El número de teléfono debe estar entre 5 y 1000000000000.",
    "phone_number.unsigned": "El número de teléfono no puede ser negativo.",
    "user_id.required": "El ID del usuario es obligatorio.",
  }

  /**
   * Validación personalizada para asegurar que al menos uno de los campos sea enviado
   */
  public async validate(payload: any) {
    const { company_id, person_id } = payload

    if (!company_id && !person_id) {
      throw new Error(
        'Debes proporcionar un "company_id" si es una empresa o un "person_id" si es una persona natural.'
      )
    }

    if (company_id && person_id) {
      throw new Error(
        'Solo uno de los campos, "company_id" o "person_id", debe ser proporcionado, no ambos.'
      )
    }
  }
}

