import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehiclesDriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    assignment_date: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.beforeOrEqual('today'), // Asegura que la fecha de asignación no sea futura
    ]),
    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }), // Verifica que el vehículo exista en la tabla `vehicles`
      rules.unsigned(), // Asegura que el ID del vehículo sea positivo
    ]),
    driver_id: schema.number([
      rules.exists({ table: 'drivers', column: 'id' }), // Verifica que el conductor exista en la tabla `drivers`
      rules.unsigned(), // Asegura que el ID del conductor sea positivo
    ]),
  })

  public messages: CustomMessages = {
    'assignment_date.required': 'La fecha de asignación es obligatoria',
    'assignment_date.beforeOrEqual': 'La fecha de asignación no puede ser una fecha futura',
    'vehicle_id.required': 'El ID del vehículo es obligatorio',
    'vehicle_id.exists': 'El vehículo especificado no existe',
    'vehicle_id.unsigned': 'El ID del vehículo debe ser un número positivo',
    'driver_id.required': 'El ID del conductor es obligatorio',
    'driver_id.exists': 'El conductor especificado no existe',
    'driver_id.unsigned': 'El ID del conductor debe ser un número positivo',}
}
