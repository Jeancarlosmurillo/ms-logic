import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lot from 'App/Models/Lot';

export default class LotsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theLot: Lot = await Lot.findOrFail(params.id); 
          return theLot;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);  
            return await Lot.query().paginate(page, perPage);  //cuando hace la consulta se hace en ese rango de pagina
          } else {
            return await Lot.query(); //es para que espere a la base de datos
          }
        }
      }
      public async create({ request }: HttpContextContract) {
      //  await request.validate(LotValidator)
        const body = request.body();
        const theLot: Lot = await Lot.create(body);
        return theLot;
      }
    
      public async update({ params, request }: HttpContextContract) {   
        const theLot: Lot = await Lot.findOrFail(params.id);  //busque el teatro con el identificador
        const body = request.body(); //leer lo que viene en la carta
        theLot.weight = body.weight;  //de lo que está en la base de datos, actualice con lo que viene dentro del body
        theLot.quantity_kg= body.quantity_kg;
        return await theLot.save(); //se confirma a la base de datos el cambio
      }
    
      public async delete({ params, response }: HttpContextContract) {  //
        const theLot: Lot = await Lot.findOrFail(params.id); //buscarlo
        response.status(204);
        return await theLot.delete(); //el teatro que se encontro, eliminelo
      }
}