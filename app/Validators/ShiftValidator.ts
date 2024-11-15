import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShiftValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({type_shift: schema.string({}, [
    rules.maxLength(20), // Limita el tipo de turno a 20 caracteres
  ]),
  status: schema.string({}, [
    rules.maxLength(15), // Limita el estado a 15 caracteres (ej. 'Activo', 'Inactivo')
  ]),
  start_date: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
    rules.beforeField('end_date'), // Asegura que la fecha de inicio sea anterior a la de fin
  ]),
  end_date: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
    rules.afterField('start_date'), // Asegura que la fecha de fin sea posterior a la de inicio
  ]),
  driver_id: schema.number([
    rules.exists({ table: 'drivers', column: 'id' }), // Verifica que el conductor exista en la tabla `drivers`
    rules.unsigned(), // Asegura que el ID del conductor sea positivo
  ]),
})

public messages:CustomMessages = {
  'type_shift.required': 'El tipo de turno es obligatorio',
  'type_shift.maxLength': 'El tipo de turno no puede exceder los 20 caracteres',
  'status.required': 'El estado es obligatorio',
  'status.maxLength': 'El estado no puede exceder los 15 caracteres',
  'start_date.required': 'La fecha de inicio es obligatoria',
  'start_date.beforeField': 'La fecha de inicio debe ser anterior a la fecha de fin',
  'end_date.required': 'La fecha de fin es obligatoria',
  'end_date.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
  'driver_id.required': 'El ID del conductor es obligatorio',
  'driver_id.exists': 'El conductor especificado no existe',
  'driver_id.unsigned': 'El ID del conductor debe ser un número positivo',}
}
