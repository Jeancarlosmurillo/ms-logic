import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional({ trim: false }),
    email: schema.string.optional({ trim: false }, [
      rules.email(),
    ]),
    password: schema.string.optional({ trim: false }),
  })

  public messages:CustomMessages = {}
}
