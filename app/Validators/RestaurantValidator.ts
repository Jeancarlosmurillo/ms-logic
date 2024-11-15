import { schema, CustomMessages,rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestaurantValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    restaurant_id: schema.number.optional([
      rules.unique({
        table: 'restaurants',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    name: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(60)

    ]),
    is_available: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    'name.required': 'El campo nombre del restaurante es requerido',
    'name.minLength': 'El campo nombre del restaurante debe tener al menos 1 caracter',
    'name.maxLength': 'El campo nombre del restaurante debe tener como máximo 60 caracteres',
    'name.unique': 'El nombre del restaurante ya se encuentra registrado',
  }
}
