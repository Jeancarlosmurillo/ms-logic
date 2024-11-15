import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RouteValidator {
  constructor(protected ctx: HttpContextContract) {}

   public schema = schema.create({
    contract_id: schema.number([
      rules.exists({ table: 'contracts', column: 'id' }), // Asegura que el contrato exista
      rules.unsigned(), // Debe ser un número positivo
    ]),
    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }), // Asegura que el vehículo exista
      rules.unsigned(), // Debe ser un número positivo
    ]),
  })

  public messages: CustomMessages = {
    'contract_id.required': 'El ID del contrato es obligatorio',
    'contract_id.exists': 'El contrato especificado no existe',
    'contract_id.unsigned': 'El ID del contrato debe ser un número positivo',
    'vehicle_id.required': 'El ID del vehículo es obligatorio',
    'vehicle_id.exists': 'El vehículo especificado no existe',
    'vehicle_id.unsigned': 'El ID del vehículo debe ser un número positivo',}
}
