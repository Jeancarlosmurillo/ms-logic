import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.alphaNum({
        allow: ['space', 'underscore', 'dash']
      }),
      rules.minLength(2),
      rules.maxLength(100),
    ]),
    description: schema.string([
      rules.alphaNum({
        allow: ['space', 'underscore', 'dash']
      }),
      rules.minLength(2),
      rules.maxLength(100),
    ]),
    price: schema.number([
      rules.range(1, 1000000)
    ]),
    cuantity: schema.number([
      rules.range(1, 1000000)
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre del producto es obligatorio.',
    'name.alphaNum': 'El nombre solo puede contener letras, números, espacios, guiones bajos y guiones.',
    'name.minLength': 'El nombre debe tener al menos 2 caracteres.',
    'name.maxLength': 'El nombre no puede exceder los 100 caracteres.',
    'description.required': 'La descripción del producto es obligatoria.',
    'description.alphaNum': 'La descripción solo puede contener letras, números, espacios, guiones bajos y guiones.',
    'description.minLength': 'La descripción debe tener al menos 2 caracteres.',
    'description.maxLength': 'La descripción no puede exceder los 100 caracteres.',
    'price.required': 'El precio es obligatorio.',
    'price.range': 'El precio debe estar entre 1 y 1,000,000.',
    'cuantity.required': 'La cantidad es obligatoria.',
    'cuantity.range': 'La cantidad debe estar entre 1 y 1,000.'
  }
}
