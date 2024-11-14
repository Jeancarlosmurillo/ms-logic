import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.number([
      rules.exists({ table: 'categories', column: 'id' })
    ]),
    product_id: schema.number([
      rules.exists({ table: 'products', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'category_id.required': 'El ID de la categoría es obligatorio.',
    'category_id.exists': 'La categoría seleccionada no existe.',
    'product_id.required': 'El ID del producto es obligatorio.',
    'product_id.exists': 'El producto seleccionado no existe.'
  }
}
