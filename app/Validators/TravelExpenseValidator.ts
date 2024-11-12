import { schema, CustomMessages,rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TravelExpenseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    restaurant_id: schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ]),
    hotel_id:schema.number([
        rules.unsigned() // Asegura que sea un número positivo (clave foránea)
      ]),
    amount_restaurant: schema.number([
        rules.unsigned(),            
       // rules.range(0.01, 100000),   
      ]),
    amount_hotel: schema.number([
        rules.unsigned(),            
       // rules.range(0.01, 100000),  
      ]),
    date_service_restaurant: schema.date({
        format: 'yyyy-MM-dd HH:mm:ss'
    }),
    date_service_hotel: schema.date({
        format: 'yyyy-MM-dd HH:mm:ss'
    })
  })

  public messages: CustomMessages = {}
}
