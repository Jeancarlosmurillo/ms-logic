import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({ license: schema.number([
    rules.unsigned(), // La licencia debe ser un número positivo
    rules.range(100000, 999999), // Limita la licencia a 6 dígitos (ajusta el rango según tus requisitos)
  ]),
  license_type: schema.string({}, [
    rules.maxLength(3), // Limita el tipo de licencia a 3 caracteres (por ejemplo: 'A1', 'B2')
  ]),
  user_id: schema.number([
    rules.exists({ table: 'users', column: 'id' }), // Verifica que el usuario exista en la tabla `users`
    rules.unsigned(), // El ID de usuario debe ser un número positivo
  ]),
})

public messages:CustomMessages = {
  'license.required': 'El número de licencia es obligatorio',
  'license.unsigned': 'El número de licencia debe ser un número positivo',
  'license.range': 'El número de licencia debe ser de 6 dígitos',
  'license_type.required': 'El tipo de licencia es obligatorio',
  'license_type.maxLength': 'El tipo de licencia no puede exceder los 3 caracteres',
  'user_id.required': 'El ID de usuario es obligatorio',
  'user_id.exists': 'El usuario especificado no existe',
  'user_id.unsigned': 'El ID de usuario debe ser un número positivo',}
}
