import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    driver_id: schema.number([
      rules.exists({ table: 'drivers', column: 'id' }), // Verifica que el ID del conductor exista
      rules.unsigned() // Asegura que sea un número positivo
    ]),
    owner_id: schema.number([
      rules.exists({ table: 'owners', column: 'id' }), // Verifica que el ID del propietario exista
      rules.unsigned() // Asegura que sea un número positivo
    ]),
    travel_expense_id: schema.number([
      rules.exists({ table: 'travel_expenses', column: 'id' }), // Verifica que el ID del gasto de viaje exista
      rules.unsigned() // Asegura que sea un número positivo
    ]),
    service_id: schema.number([
      rules.exists({ table: 'services', column: 'id' }), // Verifica que el ID del servicio exista
      rules.unsigned() // Asegura que sea un número positivo
    ])
  })

  public messages: CustomMessages = {
    'driver_id.required': 'El ID del conductor es obligatorio.',
    'driver_id.exists': 'El conductor seleccionado no existe.',
    'driver_id.unsigned': 'El ID del conductor debe ser un número positivo.',
    'owner_id.required': 'El ID del propietario es obligatorio.',
    'owner_id.exists': 'El propietario seleccionado no existe.',
    'owner_id.unsigned': 'El ID del propietario debe ser un número positivo.',
    'travel_expense_id.required': 'El ID del gasto de viaje es obligatorio.',
    'travel_expense_id.exists': 'El gasto de viaje seleccionado no existe.',
    'travel_expense_id.unsigned': 'El ID del gasto de viaje debe ser un número positivo.',
    'service_id.required': 'El ID del servicio es obligatorio.',
    'service_id.exists': 'El servicio seleccionado no existe.',
    'service_id.unsigned': 'El ID del servicio debe ser un número positivo.'
  }
}
