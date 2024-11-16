import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.alpha({ allow: ['space'] }), // Permite solo letras y espacios
      rules.maxLength(50) // Limita el nombre a 50 caracteres
    ]),
    last_name: schema.string({}, [
      rules.alpha({ allow: ['space'] }), // Permite solo letras y espacios
      rules.maxLength(50) // Limita el apellido a 50 caracteres
    ]),
    email: schema.string({}, [
      rules.email(), // Verifica que el formato sea un correo electrónico
      rules.maxLength(100),
      rules.unique({ table: 'users', column: 'email' }) // Asegura que el correo sea único
    ]),
    phone: schema.string({}, [
      rules.regex(/^\d+$/), // Permite solo números
      rules.minLength(8), // Mínimo de 8 dígitos
      rules.maxLength(15) // Máximo de 15 dígitos
    ]),
    rol: schema.enum(['admin', 'user', 'driver','person','customer','owner'] as const), // Enumera los roles permitidos
    password: schema.string({}, [
      rules.minLength(8), // Mínimo de 8 caracteres para la contraseña
      rules.maxLength(50) // Máximo de 50 caracteres
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre es obligatorio.',
    'name.alpha': 'El nombre solo puede contener letras y espacios.',
    'name.maxLength': 'El nombre no puede exceder los 50 caracteres.',
    'last_name.required': 'El apellido es obligatorio.',
    'last_name.alpha': 'El apellido solo puede contener letras y espacios.',
    'last_name.maxLength': 'El apellido no puede exceder los 50 caracteres.',
    'email.required': 'El correo electrónico es obligatorio.',
    'email.email': 'El correo electrónico debe ser válido.',
    'email.maxLength': 'El correo electrónico no puede exceder los 100 caracteres.',
    'email.unique': 'El correo electrónico ya está registrado.',
    'phone.required': 'El número de teléfono es obligatorio.',
    'phone.regex': 'El número de teléfono solo puede contener dígitos.',
    'phone.minLength': 'El número de teléfono debe tener al menos 8 dígitos.',
    'phone.maxLength': 'El número de teléfono no puede exceder los 15 dígitos.',
    'rol.required': 'El rol es obligatorio.',
    'rol.enum': 'El rol debe ser uno de los valores permitidos: admin, user o guest.',
    'password.required': 'La contraseña es obligatoria.',
    'password.minLength': 'La contraseña debe tener al menos 8 caracteres.',
    'password.maxLength': 'La contraseña no puede exceder los 50 caracteres.'
  }
}
