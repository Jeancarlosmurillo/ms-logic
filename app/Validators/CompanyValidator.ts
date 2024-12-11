import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompanyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name_company: schema.string({}, [
      rules.minLength(3), // Mínimo 3 caracteres para el nombre
      rules.maxLength(255), // Máximo 255 caracteres
    ]),

    customer_id: schema.number([
      rules.exists({ table: 'customer_people', column: 'id' }), // Verifica que exista en la tabla de personas
      rules.unsigned(), // Debe ser positivo
    ]),
  })

  public messages: CustomMessages = {
    // Mensajes para name_company
    'name_company.required': 'El nombre de la empresa es obligatorio.',
    'name_company.minLength': 'El nombre de la empresa debe tener al menos 3 caracteres.',
    'name_company.maxLength': 'El nombre de la empresa no puede exceder los 255 caracteres.',

    // Mensajes para person_id
    'customer_id.required': 'El ID del cliente responsable es obligatorio.',
    'customer_id.exists': 'El ID proporcionado no corresponde a ningl cliente registrada.',
    'customer_id.unsigned': 'El ID del cliente debe ser un número positivo.',
  }
}
