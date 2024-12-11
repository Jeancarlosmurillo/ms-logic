import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    address_id: schema.number.optional([
      rules.unique({
        table: 'addresses',
        column: 'id',
        where: { id: this.ctx.request.input('id') },
      }),
    ]),
    street: schema.string({}, [
      rules.maxLength(100)
    ]),
    neighborhood: schema.string({}, [
      rules.maxLength(100)
    ]),
    door_number: schema.string({}, [
      rules.maxLength(6)
    ]),
    municipality_id: schema.number([
      rules.unsigned()
    ]),

    municipality_name: schema.string([
      rules.maxLength(30)
    ])
  })

  public messages: CustomMessages = {
    'street.required': 'La calle es obligatoria.',
    'street.maxLength': 'El nombre de la calle no puede exceder los 100 caracteres.',
    'neighborhood.required': 'El vecindario es obligatorio.',
    'neighborhood.maxLength': 'El nombre del vecindario no puede exceder los 100 caracteres.',
    'door_number.required': 'El número de puerta es obligatorio.',
    'door_number.regex': 'El número de puerta debe contener solo números.',
    'door_number.maxLength': 'El número de puerta no puede exceder los 10 caracteres.',
    'municipality_id.required': 'El ID del municipio es obligatorio.',
    'municipality_id.unsigned': 'El ID del municipio debe ser un número positivo.',
    'municipality_name.required': 'El nombre del municipio es obligatorio.',
  }
}
