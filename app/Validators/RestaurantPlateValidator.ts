import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestaurantPlateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    price: schema.number([
      rules.unsigned(), 
      rules.range(1, 10000000), // Rango razonable para el precio
    ]),
    plate_id: schema.number([
      rules.exists({ table: 'plates', column: 'id' }), // Asegura que el ID exista en la tabla `plates`
    ]),
    restaurant_id: schema.number([
      rules.exists({ table: 'restaurants', column: 'id' }), // Asegura que el ID exista en la tabla `restaurants`
    ]),
  })

  public messages: CustomMessages = {
    'price.required': 'El campo "price" es obligatorio.',
    'price.number': 'El campo "price" debe ser un número.',
    'price.unsigned': 'El campo "price" debe ser un número positivo.',
    'price.range': 'El campo "price" debe estar entre 1 y 1,000,000.',
    'plate_id.required': 'El campo "plate_id" es obligatorio.',
    'plate_id.number': 'El campo "plate_id" debe ser un número.',
    'plate_id.exists': 'El "plate_id" debe corresponder a un plato existente en la tabla `plates`.',
    'restaurant_id.required': 'El campo "restaurant_id" es obligatorio.',
    'restaurant_id.number': 'El campo "restaurant_id" debe ser un número.',
    'restaurant_id.exists': 'El "restaurant_id" debe corresponder a un restaurante existente en la tabla `restaurants`.',
  }
}
