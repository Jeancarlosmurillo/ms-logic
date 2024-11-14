import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route';
import RoutesValidator from 'App/Validators/RoutesValidator';


export default class RoutesController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRoute: Route = await Route.findOrFail(params.id)
            await theRoute.load("contract");
            await theRoute.load("vehicle");
            return theRoute; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Route.query().preload('contract').preload('vehicle').paginate(page, perPage)
            } else {
                return await Route.query().preload('contract').preload('vehicle')
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(RoutesValidator);
        const theRoute: Route = await Route.create(body);
        await theRoute.load("contract")
        await theRoute.load("vehicle")
        return theRoute;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRoute: Route = await Route.findOrFail(params.id);
        const body = request.body();
        theRoute.route_start = body.route_start;
        theRoute.route_end = body.route_end;
        theRoute.start_date = body.start_date;
        theRoute.end_date = body.end_date;
        theRoute.state = body.state;
        theRoute.contract_id = body.contract_id;
        theRoute.vehicle_id = body.vehicle_id;
        return await theRoute.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRoute: Route = await Route.findOrFail(params.id);
            response.status(204);
            return await theRoute.delete();
    }
}
