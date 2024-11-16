import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LotValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    weigth: schema.number([
      rules.range(1, 100000000)
    ]),
    quantity_kg: schema.number([
      rules.range(1, 100000000)
    ])
  })

  public messages: CustomMessages = {
    'weigth.required': 'El peso es obligatorio.',
    'weigth.range': 'El peso debe estar entre 1 y 100,000,000.',
    'quantity_kg.required': 'La cantidad en kilogramos es obligatoria.',
    'quantity_kg.range': 'La cantidad en kilogramos debe estar entre 1 y 100,000,000.'
  }
}
