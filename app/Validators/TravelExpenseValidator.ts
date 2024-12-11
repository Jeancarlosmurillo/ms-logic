import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TravelExpenseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    restaurant_id: schema.number([
      rules.unsigned()
    ]),
    hotel_id: schema.number([
      rules.unsigned()
    ]),
    amount_restaurant: schema.number([
      rules.unsigned()
    ]),
    amount_hotel: schema.number([
      rules.unsigned()
    ]),
    date_service_restaurant: schema.date({
      format: 'yyyy-MM-dd', // Solo año, mes y día
    }),
    date_service_hotel: schema.date({
      format: 'yyyy-MM-dd', // Solo año, mes y día
    }),

    administrator_id: schema.number([
      rules.exists({ table: 'administrators', column: 'id' }), // Verifica que el administrador exista
      rules.unsigned(), // Asegura que el ID sea positivo
    ])
  })

  public messages: CustomMessages = {
    'restaurant_id.required': 'El ID del restaurante es obligatorio.',
    'restaurant_id.unsigned': 'El ID del restaurante debe ser un número positivo.',
    'hotel_id.required': 'El ID del hotel es obligatorio.',
    'hotel_id.unsigned': 'El ID del hotel debe ser un número positivo.',
    'amount_restaurant.required': 'El monto del restaurante es obligatorio.',
    'amount_restaurant.unsigned': 'El monto del restaurante debe ser un número positivo.',
    'amount_hotel.required': 'El monto del hotel es obligatorio.',
    'amount_hotel.unsigned': 'El monto del hotel debe ser un número positivo.',
    'date_service_restaurant.required': 'La fecha del servicio del restaurante es obligatoria.',
    'date_service_restaurant.dateFormat': 'La fecha del servicio del restaurante debe estar en el formato yyyy-MM-dd HH:mm:ss.',
    'date_service_hotel.required': 'La fecha del servicio del hotel es obligatoria.',
    'date_service_hotel.dateFormat': 'La fecha del servicio del hotel debe estar en el formato yyyy-MM-dd HH:mm:ss.'
  }
}
