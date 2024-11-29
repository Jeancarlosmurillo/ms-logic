import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string([
    rules.alphaNum({
      allow: ['space', 'underscore', 'dash'], // Permite espacios, guiones bajos, guiones, puntos y comas
    }),
    rules.minLength(2),
    rules.maxLength(400),
  ]),
  description: schema.string([
    rules.alphaNum({
      allow: ['space', 'underscore', 'dash'], // Permite espacios, guiones bajos, guiones, puntos y comas
    }),
    rules.minLength(2),
    rules.maxLength(400), // Se permite una descripción más larga
  ]),
})

public messages: CustomMessages = {
  'name.required': 'El campo "name" es obligatorio.',
  'name.alphaNum': 'El campo "name" solo puede contener caracteres alfanuméricos, espacios, guiones bajos, guiones, puntos y comas.',
  'name.minLength': 'El campo "name" debe tener al menos 2 caracteres.',
  'name.maxLength': 'El campo "name" no puede superar los 100 caracteres.',
  'description.required': 'El campo "description" es obligatorio.',
  'description.alphaNum': 'El campo "description" solo puede contener caracteres alfanuméricos, espacios, guiones bajos, guiones, puntos y comas.',
  'description.minLength': 'El campo "description" debe tener al menos 2 caracteres.',
  'description.maxLength': 'El campo "description" no puede superar los 255 caracteres.',
}
}
