import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route';
import RouteValidator from 'App/Validators/RouteValidator';

export default class RoutesController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRouRoute:Route = await Route.findOrFail(params.id)
            return theRouRoute; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Route.query().paginate(page, perPage)
            } else {
                return await Route.query()
            } // Devuelve todos los elementos 
    
        }
    
    }
    public async create({ request }: HttpContextContract) {
         await request.validate(RouteValidator);
        const body = request.body();
        const theRouRoute:Route = await Route.create(body);
        return theRouRoute;
    }
    
    public async update({ params, request }: HttpContextContract) {
        const theRouRoute:Route = await Route.findOrFail(params.id);
        const body = request.body();
        theRouRoute.vehicle_id = body.vehicle_id;
        theRouRoute.contract_id = body.contract_id;
        return await theRouRoute.save();
    }
    
    public async delete({ params, response }: HttpContextContract) {
        const theRouRoute:Route = await Route.findOrFail(params.id);
            response.status(204);
            return await theRouRoute.delete();
    }
    }
    