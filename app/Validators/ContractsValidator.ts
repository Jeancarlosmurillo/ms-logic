import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContractValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string({}, [
      rules.maxLength(255) // Limita la descripción a 255 caracteres
    ]),
    date: schema.date({
      format: 'yyyy-MM-dd' // Formato de fecha
    }),
    customer_id: schema.number([
      rules.exists({ table: 'customers', column: 'id' }), // Verifica que el ID del cliente exista
      rules.unsigned() // Asegura que sea un número positivo
    ])
  })

  public messages: CustomMessages = {
    'description.required': 'La descripción del contrato es obligatoria.',
    'description.maxLength': 'La descripción no puede exceder los 255 caracteres.',
    'date.required': 'La fecha del contrato es obligatoria.',
    'date.dateFormat': 'La fecha debe estar en el formato yyyy-MM-dd.',
    'customer_id.required': 'El ID del cliente es obligatorio.',
    'customer_id.exists': 'El cliente seleccionado no existe.',
    'customer_id.unsigned': 'El ID del cliente debe ser un número positivo.'
  }
}
