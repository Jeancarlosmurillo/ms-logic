import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class ContractValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string({}, [
      rules.maxLength(400), // Maximo de caracteres para descripcion
    ]),
    date: schema.date({ 
      format: 'dd-MM-yyyy HH:mm:ss'
  }),
    customer_id: schema.number([
      rules.exists({ table: 'customers', column: 'id' }),
    ]),

  })

  public messages: CustomMessages = {
    'description.required': 'La descripción es obligatoria',
    'description.maxLength': 'La descripción no puede tener más de 400 caracteres',
    'date.required': 'La fecha es obligatoria',
    'date.format': 'Formato de fecha incorrecto',
    'customer_id.required': 'El ID del cliente es obligatorio',
    'customer_id.exists': 'El ID del cliente debe existir en la tabla de clientes',
  }
}
