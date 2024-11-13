import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ype: schema.string({}, [
      rules.maxLength(20), // Limita el tipo a 20 caracteres
    ]),
    date_order: schema.date( { format: 'yyyy-MM-dd' }, [
      rules.beforeOrEqual('today'), // La fecha de la orden debe ser hoy o en el pasado
    ]),
    address_id: schema.number([
      rules.exists({ table: 'addresses', column: 'id' }), // Verifica que la dirección exista
      rules.unsigned(), // Asegura que el ID sea positivo
    ]),
    route_id: schema.number([
      rules.exists({ table: 'routes', column: 'id' }), // Verifica que la ruta exista
      rules.unsigned(), // Asegura que el ID sea positivo
    ]),
    lot_id: schema.number([
      rules.exists({ table: 'lots', column: 'id' }), // Verifica que el lote exista
      rules.unsigned(), // Asegura que el ID sea positivo
    ]),
    contract_id: schema.number([
      rules.exists({ table: 'contracts', column: 'id' }), // Verifica que el contrato exista
      rules.unsigned(), // Asegura que el ID sea positivo
    ]),
  })

  public messages: CustomMessages = {}
}
