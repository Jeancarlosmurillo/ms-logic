import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    street: schema.string({}, [
        rules.maxLength(100) // Limita el nombre de la calle a 100 caracteres, por ejemplo
      ]),
      neighborhood: schema.string({}, [
        rules.maxLength(100) // Limita el nombre del vecindario a 100 caracteres, por ejemplo
      ]),
      door_number: schema.string({}, [
        rules.regex(/^\d+$/), // Permite solo números para el número de puerta
        rules.maxLength(10)   // Limita a un máximo de 10 caracteres
      ]),
      municipality_id: schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ])
    })

  public messages: CustomMessages = {}
}
