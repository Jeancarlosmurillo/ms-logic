import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoutesValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    route_start: schema.string({}, [
      rules.maxLength(100) // Limita el inicio de la ruta a 100 caracteres, por ejemplo
    ]),
    route_end: schema.string({}, [
      rules.maxLength(100) // Limita el final de la ruta a 100 caracteres, por ejemplo
    ]),
    start_date: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss' // Formato de fecha y hora para el inicio de la ruta
    }),
    end_date: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss' // Formato de fecha y hora para el final de la ruta
    }),
    state: schema.string({}, [
      rules.maxLength(50) // Limita el estado a 50 caracteres, por ejemplo
    ]),
    contract_id: schema.number([
      rules.exists({ table: 'contracts', column: 'id' }), // Valida que el ID exista en la tabla de contratos
      rules.unsigned() // Asegura que sea un número positivo
    ]),
    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }), // Valida que el ID exista en la tabla de vehículos
      rules.unsigned() // Asegura que sea un número positivo
    ])
  })

  public messages: CustomMessages = {
    'route_start.required': 'El inicio de la ruta es obligatorio.',
    'route_start.maxLength': 'El inicio de la ruta no puede exceder los 100 caracteres.',
    'route_end.required': 'El final de la ruta es obligatorio.',
    'route_end.maxLength': 'El final de la ruta no puede exceder los 100 caracteres.',
    'start_date.required': 'La fecha de inicio es obligatoria.',
    'start_date.dateFormat': 'La fecha de inicio debe estar en el formato yyyy-MM-dd HH:mm:ss.',
    'end_date.required': 'La fecha de fin es obligatoria.',
    'end_date.dateFormat': 'La fecha de fin debe estar en el formato yyyy-MM-dd HH:mm:ss.',
    'state.required': 'El estado de la ruta es obligatorio.',
    'state.maxLength': 'El estado no puede exceder los 50 caracteres.',
    'contract_id.required': 'El ID del contrato es obligatorio.',
    'contract_id.exists': 'El contrato seleccionado no existe.',
    'contract_id.unsigned': 'El ID del contrato debe ser un número positivo.',
    'vehicle_id.required': 'El ID del vehículo es obligatorio.',
    'vehicle_id.exists': 'El vehículo seleccionado no existe.',
    'vehicle_id.unsigned': 'El ID del vehículo debe ser un número positivo.'
  }
}










