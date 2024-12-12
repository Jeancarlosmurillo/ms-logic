import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BillValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    date_bill: schema.date({
      format: "yyyy-MM-dd",
    }),
    total_amount: schema.number([rules.range(1, 60000000000)]),
    state: schema.string(),
    // quotas: schema.number([rules.range(1, 36)]),
  });

  public messages: CustomMessages = {
    "date_bill.required": "La fecha de la factura es obligatoria.",
    "date_bill.dateFormat":
      "La fecha de la factura debe estar en formato dd-MM-yyyy.",
    "total_amount.required": "El monto total es obligatorio.",
    "total_amount.range": "El monto total debe estar entre 1 y 60,000,000,000.",
    "state.required": "El estado es obligatorio.",
    "quotas.required": "El número de cuotas es obligatorio.",
    "quotas.range": "El número de cuotas debe estar entre 1 y 36.",
  };
}
