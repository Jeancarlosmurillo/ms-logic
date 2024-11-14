import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    plate: schema.string({}, [
      rules.alphaNum({ allow: ['dash'] }), // Permite solo letras, números y guiones
      rules.maxLength(10) // Limita la placa a 10 caracteres
    ]),
    type: schema.string({}, [
      rules.maxLength(50) // Limita el tipo de vehículo a 50 caracteres
    ]),
    capacitity: schema.number([
      rules.range(1, 100000) // Rango de capacidad entre 1 y 100,000, por ejemplo
    ]),
    state: schema.string({}, [
      rules.maxLength(50) // Limita el estado del vehículo a 50 caracteres
    ]),
    current_location: schema.string.optional({}, [
      rules.maxLength(100) // Limita la ubicación actual a 100 caracteres
    ])
  })

  public messages: CustomMessages = {
    'plate.required': 'La placa del vehículo es obligatoria.',
    'plate.alphaNum': 'La placa solo puede contener letras, números y guiones.',
    'plate.maxLength': 'La placa no puede exceder los 10 caracteres.',
    'type.required': 'El tipo de vehículo es obligatorio.',
    'type.maxLength': 'El tipo de vehículo no puede exceder los 50 caracteres.',
    'capacitity.required': 'La capacidad del vehículo es obligatoria.',
    'capacitity.range': 'La capacidad debe estar entre 1 y 100,000.',
    'state.required': 'El estado del vehículo es obligatorio.',
    'state.maxLength': 'El estado no puede exceder los 50 caracteres.',
    'current_location.maxLength': 'La ubicación actual no puede exceder los 100 caracteres.'
  }
}
