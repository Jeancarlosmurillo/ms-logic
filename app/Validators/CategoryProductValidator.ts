import { schema, CustomMessages,rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.number([
      rules.unsigned() // Asegura que sea un número positivo (clave foránea)
    ]),
    product_id: schema.number([
      rules.unsigned() // Asegura que sea un número positivo (clave foránea)
    ])
  })

  public messages: CustomMessages = {}
}
