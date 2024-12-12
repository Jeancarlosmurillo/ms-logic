import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LotValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    weight: schema.number([rules.range(1, 100000000)]),
    quantity_kg: schema.number([rules.range(1, 100000000)]),
    // route_id: schema.number([rules.exists({ table: 'routes', column: 'id' })]) // Verifica que la ruta existe
  });

  public messages: CustomMessages = {
    "weight.required": "El peso es obligatorio.",
    "weight.range": "El peso debe estar entre 1 y 100,000,000.",
    "quantity_kg.required": "La cantidad en kilogramos es obligatoria.",
    "quantity_kg.range":
      "La cantidad en kilogramos debe estar entre 1 y 100,000,000.",
  };
}
