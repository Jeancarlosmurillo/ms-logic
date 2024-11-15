import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route';
import RouteValidator from 'App/Validators/RouteValidator';

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
        await request.validate(RouteValidator) //Validador
        const body = request.body();
        const theRoute: Route = await Route.create(body);
        await theRoute.load("contract")
        await theRoute.load("vehicle")
        return theRoute;
    }

    public async update({ params, request }: HttpContextContract) {
        await request.validate(RouteValidator) //Validador
        const theRoute: Route = await Route.findOrFail(params.id);
        const body = request.body();
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
