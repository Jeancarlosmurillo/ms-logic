<<<<<<< HEAD
import { schema, CustomMessages, rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
=======
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
>>>>>>> 577d83402e3a022a2ba81a495337e4441b4e6f05

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
<<<<<<< HEAD
    name: schema.string.optional({ trim: false }),
    email: schema.string.optional({ trim: false }, [
      rules.email(),
    ]),
    password: schema.string.optional({ trim: false }),
  })

  public messages: CustomMessages = {
    'name.string': 'name must be a string',
    'email.string': 'email must be a string',
    'email.email': 'email must be a valid email',
    'password.string': 'password must be a string',
  }
=======
    phone_number: schema.number([rules.required()]),
    // user_id: schema.string([rules.required()]),
  });

  public messages: CustomMessages = {
    "phone_number.required": "El número de teléfono es obligatorio.",
    "phone_number.range":
      "El número de teléfono debe estar entre 5 y 1000000000000.",
    "phone_number.unsigned": "El número de teléfono no puede ser negativo.",
    // "user_id.required": "El ID del usuario es obligatorio.",
  };

  /**
   * Validación personalizada para asegurar que al menos uno de los campos sea enviado
   */
  // public async validate(payload: any) {
  //   const { company_id, person_id } = payload;

  //   if (!company_id && !person_id) {
  //     throw new Error(
  //       'Debes proporcionar un "company_id" si es una empresa o un "person_id" si es una persona natural.'
  //     );
  //   }

  //   if (company_id && person_id) {
  //     throw new Error(
  //       'Solo uno de los campos, "company_id" o "person_id", debe ser proporcionado, no ambos.'
  //     );
  //   }
>>>>>>> 577d83402e3a022a2ba81a495337e4441b4e6f05
}
