import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
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
    category_id: schema.number.nullable([
      rules.exists({ table: 'categories', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre es obligatorio.',
    'name.alphaNum': 'El nombre solo puede contener letras, números, espacios, guiones bajos y guiones.',
    'name.minLength': 'El nombre debe tener al menos 2 caracteres.',
    'name.maxLength': 'El nombre no puede exceder los 100 caracteres.',
    'description.required': 'La descripción es obligatoria.',
    'description.alphaNum': 'La descripción solo puede contener letras, números, espacios, guiones bajos y guiones.',
    'description.minLength': 'La descripción debe tener al menos 2 caracteres.',
    'description.maxLength': 'La descripción no puede exceder los 100 caracteres.',
    'category_id.exists': 'La categoría principal seleccionada no existe.'
  }
}
