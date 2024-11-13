import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SureValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }), // Verifica que el vehículo exista
      rules.unsigned(), // Debe ser un número positivo
    ]),
    policy_number: schema.string({}, [
      rules.maxLength(20), // Limita la longitud del número de póliza
    ]),
    issue_date: schema.date({format: 'yyyy-MM-dd'}),
    expiration_date: schema.date({format: 'yyyy-MM-dd'},[
      rules.afterField('issue_date'), // La fecha de expiración debe ser después de la fecha de emisión
    ]),
    value: schema.number([
      rules.unsigned(), // Asegura que el valor sea positivo
    ]),
    validity: schema.string({}, [
      rules.maxLength(50), // Limita la longitud de la validez a 50 caracteres
    ]),
    insurance_company: schema.string({}, [
      rules.maxLength(100), // Limita la longitud del nombre de la compañía aseguradora
    ]),
    payment_status: schema.enum(['paid', 'unpaid', 'pending']), // Estado de pago permitido
  })

  public messages: CustomMessages = {
    'vehicle_id.required': 'El ID del vehículo es obligatorio',
    'vehicle_id.exists': 'El vehículo especificado no existe',
    'vehicle_id.unsigned': 'El ID del vehículo debe ser un número positivo',
    'policy_number.required': 'El número de póliza es obligatorio',
    'policy_number.maxLength': 'El número de póliza no puede tener más de 20 caracteres',
    'issue_date.required': 'La fecha de emisión es obligatoria',
    'expiration_date.required': 'La fecha de expiración es obligatoria',
    'expiration_date.afterField': 'La fecha de expiración debe ser posterior a la fecha de emisión',
    'value.required': 'El valor de la póliza es obligatorio',
    'value.number': 'El valor debe ser un número',
    'value.unsigned': 'El valor debe ser un número positivo',
    'validity.required': 'La validez es obligatoria',
    'validity.maxLength': 'La validez no puede tener más de 50 caracteres',
    'insurance_company.required': 'La compañía aseguradora es obligatoria',
    'insurance_company.maxLength': 'El nombre de la compañía aseguradora no puede tener más de 100 caracteres',
    'payment_status.required': 'El estado de pago es obligatorio',
    'payment_status.enum': 'El estado de pago debe ser uno de los siguientes: paid, unpaid, pending',}
}
