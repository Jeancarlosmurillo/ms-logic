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
    rules.exists({ table: "categories", column: "id" }),
   ])
  })

  
   
  public messages: CustomMessages = {}
}
