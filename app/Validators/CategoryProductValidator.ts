import { schema, CustomMessages, rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.number(),
    product_id: schema.number(),
  })

  public messages: CustomMessages = {}
}
