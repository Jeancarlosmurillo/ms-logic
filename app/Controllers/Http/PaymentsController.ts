import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment';
import PaymentValidator from 'App/Validators/PaymentValidator';

export default class PaymentsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let thePayment: Payment = await Payment.findOrFail(params.id); 
          return thePayment;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);  
            return await Payment.query().paginate(page, perPage);  //cuando hace la consulta se hace en ese rango de pagina
          } else {
            return await Payment.query(); //es para que espere a la base de datos
          }
        }
      }
      public async create({ request }: HttpContextContract) {
       const body = await request.validate(PaymentValidator) 
        const thePayment: Payment = await Payment.create(body);
        return thePayment;
      }

      public async update({ params, request }: HttpContextContract) {   
        const thePayment: Payment = await Payment.findOrFail(params.id);  //busque el teatro con el identificador
        const body = request.body(); //leer lo que viene en la carta
        thePayment.payment_date = body.payment_date;  //de lo que está en la base de datos, actualice con lo que viene dentro del body
        return await thePayment.save(); //se confirma a la base de datos el cambio
      }
    
      public async delete({ params, response }: HttpContextContract) {  //
        const thePayment: Payment = await Payment.findOrFail(params.id); //buscarlo
        response.status(204);
        return await thePayment.delete(); //el teatro que se encontro, eliminelo
    }
}
