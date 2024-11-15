import { schema, CustomMessages,rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    hotel_id: schema.number.optional([
      rules.unique({
        table: 'hotels',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    name: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(60),
    ]),
    is_available: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    'name.required': 'El campo nombre del hotel es requerido',
    'name.minLength': 'El campo nombre del hotel debe tener al menos 1 caracter',
    'name.maxLength': 'El campo nombre del hotel debe tener como máximo 60 caracteres',
    'name.unique': 'El nombre del hotel ya se encuentra registrado',
  }
}
