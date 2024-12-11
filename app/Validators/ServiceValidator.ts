import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    amount: schema.number([
      rules.unsigned(), // Asegura que el monto sea positivo
    ]),
    date_service: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.beforeOrEqual('today'), // Asegura que la fecha no sea futura
    ]),
   
    contract_id: schema.number([
      rules.exists({ table: 'contracts', column: 'id' }), // Verifica que el contrato exista
      rules.unsigned(), // Asegura que el ID sea positivo
    ]),
    tranches_id: schema.number.optional([
      rules.exists({ table: 'tranches', column: 'id' }), // Verifica que el tramo exista si se proporciona
      rules.unsigned(), // Asegura que el ID sea positivo
    ]),
  })

  public messages:CustomMessages = {
    'amount.required': 'El monto es obligatorio',
    'amount.unsigned': 'El monto debe ser un número positivo',
    'date_service.required': 'La fecha del servicio es obligatoria',
    'date_service.beforeOrEqual': 'La fecha del servicio no puede ser una fecha futura',
    'administrator_id.required': 'El ID del administrador es obligatorio',
    'administrator_id.exists': 'El administrador especificado no existe',
    'administrator_id.unsigned': 'El ID del administrador debe ser un número positivo',
    'contract_id.required': 'El ID del contrato es obligatorio',
    'contract_id.exists': 'El contrato especificado no existe',
    'contract_id.unsigned': 'El ID del contrato debe ser un número positivo',
    'tranches_id.exists': 'El tramo especificado no existe',
    'tranches_id.unsigned': 'El ID del tramo debe ser un número positivo'
  }
}
