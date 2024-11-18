import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bill from 'App/Models/Bill';
import BillValidator from 'App/Validators/BillValidator';

export default class BillsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theBill: Bill = await Bill.findOrFail(params.id); 
          return theBill;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);  
            return await Bill.query().paginate(page, perPage);  //cuando hace la consulta se hace en ese rango de pagina
          } else {
            return await Bill.query(); //es para que espere a la base de datos
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        const body = await request.validate(BillValidator);
        const theBill: Bill = await Bill.create(body);
        return theBill;
      }

      public async update({ params, request }: HttpContextContract) {   
        const theBill: Bill = await Bill.findOrFail(params.id);  //busque el teatro con el identificador
        const body = request.body(); //leer lo que viene en la carta
        theBill.date_bill = body.date_bill;  //de lo que está en la base de datos, actualice con lo que viene dentro del body
        theBill.total_amount = body.total_amount;
        theBill.state = body.state;
        theBill.quotas = body.quotas;
        return await theBill.save(); //se confirma a la base de datos el cambio
      }
    
      public async delete({ params, response }: HttpContextContract) {  //
        const theBill: Bill = await Bill.findOrFail(params.id); //buscarlo
        response.status(204);
        return await theBill.delete(); //el teatro que se encontro, eliminelo
    }
}
