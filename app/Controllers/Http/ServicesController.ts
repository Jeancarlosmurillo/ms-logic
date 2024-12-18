 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service';
import ServiceValidator from 'App/Validators/ServiceValidator';

export default class ServicesController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theService: Service = await Service.findOrFail(params.id);
          await theService.load("administrator"); //devuelve la info de que administrador tiene ese servicio
         
    
          return theService;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Service.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
          } else {
            return await Service.query(); //es para que espere a la base de datos
          }
        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(ServiceValidator) //Validador
        const body = request.body();
    
        const theService: Service = await Service.create(body);
        await theService.load("administrator"); //devuelve la info de que administrador tiene ese servicio
       
    
        return theService;
    }

    public async update({ params, request }: HttpContextContract) {
        //await request.validate(ServiceValidator) //Validador
        const theService: Service = await Service.findOrFail(params.id);
        const body = request.body();
        theService.amount = body.amount
        theService.date_service = body.date_service
        theService.contract_id = body.contract_id;
        theService.tranch_id = body.tranch_id;
    
       
        await theService.load("administrator"); //devuelve la info de que administrador tiene ese servicio
       
    
        return await theService.save(); //se confirma a la base de datos el cambio
      }
    
      public async delete({ params, response }: HttpContextContract) {
        //
        const theService: Service = await Service.findOrFail(params.id); //buscarlo
        response.status(204);
    
        return await theService.delete(); //el teatro que se encontro, eliminelo
      }
    }
    