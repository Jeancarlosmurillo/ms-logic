import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operation from 'App/Models/Operation';

export default class OperationsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theOperation: Operation = await Operation.findOrFail(params.id); 
          return theOperation;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);  
            return await Operation.query().paginate(page, perPage);  //cuando hace la consulta se hace en ese rango de pagina
          } else {
            return await Operation.query(); //es para que espere a la base de datos
          }
        }
      }
      public async create({ request }: HttpContextContract) {
      //  await request.validate(OperationValidator)
        const body = request.body();
        const theOperation: Operation = await Operation.create(body);
        return theOperation;
      }
    
      public async update({ params, request }: HttpContextContract) {   
        const theOperation: Operation = await Operation.findOrFail(params.id);  //busque el teatro con el identificador
        const body = request.body(); //leer lo que viene en la carta
        theOperation.vehicle_id = body.vehicle_id;  //de lo que está en la base de datos, actualice con lo que viene dentro del body
        theOperation.municipality_id= body.municipality_id;
        return await theOperation.save(); //se confirma a la base de datos el cambio
      }
    
      public async delete({ params, response }: HttpContextContract) {  //
        const theOperation: Operation = await Operation.findOrFail(params.id); //buscarlo
        response.status(204);
        return await theOperation.delete(); //el teatro que se encontro, eliminelo
      }
}
