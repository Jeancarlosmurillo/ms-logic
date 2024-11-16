import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    plate: schema.string({}, [
      rules.maxLength(10),
      rules.unique({ table: 'vehicles', column: 'plate' }), // Asegura que la placa sea única
    ]),
    capacitity_kg: schema.number([
      rules.unsigned(), // Asegura que la capacidad sea un número positivo
    ]),
    state: schema.enum(['active', 'inactive', 'maintenance']), // Estados válidos


  })
  public messages: CustomMessages = {
    'plate.required': 'La placa del vehículo es obligatoria',
    'plate.maxLength': 'La placa no puede tener más de 10 caracteres',
    'plate.unique': 'La placa ya está registrada',
    'type.required': 'El tipo de vehículo es obligatorio',
    'capacitity_kg.required': 'La capacidad en kg es obligatoria',
    'capacitity_kg.number': 'La capacidad debe ser un número',
    'capacitity_kg.unsigned': 'La capacidad debe ser un número positivo',
    'state.required': 'El estado del vehículo es obligatorio',
    'state.enum': 'El estado debe ser uno de los siguientes: active, inactive, maintenance',
  }
}
