import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerVehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({assignment_date: schema.date({ format: 'yyyy-MM-dd' }),
  owner_id: schema.number([
    rules.exists({ table: 'owners', column: 'id' }), // Verifica que el propietario exista en la tabla `owners`
    rules.unsigned(), // Asegura que el ID del propietario sea positivo
  ]),
  vehicle_id: schema.number([
    rules.exists({ table: 'vehicles', column: 'id' }), // Verifica que el vehículo exista en la tabla `vehicles`
    rules.unsigned(), // Asegura que el ID del vehículo sea positivo
  ]),
})

public messages:CustomMessages = {
  'assignment_date.required': 'La fecha de asignación es obligatoria',
  'assignment_date.beforeOrEqual': 'La fecha de asignación no puede ser una fecha futura',
  'owner_id.required': 'El ID del propietario es obligatorio',
  'owner_id.exists': 'El propietario especificado no existe',
  'owner_id.unsigned': 'El ID del propietario debe ser un número positivo',
  'vehicle_id.required': 'El ID del vehículo es obligatorio',
  'vehicle_id.exists': 'El vehículo especificado no existe',
  'vehicle_id.unsigned': 'El ID del vehículo debe ser un número positivo',}
}
