import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    payment_date: schema.date({
      format: 'dd-MM-yyyy',
    }),
    contract_id: schema.number([
      rules.exists({ table: 'contracts', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'payment_date.required': 'La fecha de pago es obligatoria.',
    'payment_date.dateFormat': 'La fecha de pago debe estar en formato dd-MM-yyyy.',
    'contract_id.required': 'El ID del contrato es obligatorio.',
    'contract_id.exists': 'El contrato seleccionado no existe.'
  }
}
