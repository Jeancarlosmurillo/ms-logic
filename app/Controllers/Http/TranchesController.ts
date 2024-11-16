import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tranch from 'App/Models/Tranch';
//import RouteValidator from 'App/Validators/RouteValidator';

export default class RoutesController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTranch: Tranch = await Tranch.findOrFail(params.id)
            await theTranch.load("distribution_centre_origin");
            await theTranch.load("distribution_centre_destination");
            return theTranch; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Tranch.query().preload('distribution_centre_origin').preload('distribution_centre_destination').paginate(page, perPage)
            } else {
                return await Tranch.query().preload('distribution_centre_origin').preload('distribution_centre_destination')
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
       // await request.validate(TranchValidator) //Validador
        const body = request.body();
        const theTranch: Tranch = await Tranch.create(body);
        await theTranch.load("distribution_centre_origin")
        await theTranch.load("distribution_centre_destination")
        return theTranch;
    }

    public async update({ params, request }: HttpContextContract) {
        //await request.validate(TranchValidator) //Validador
        const theTranch: Tranch = await Tranch.findOrFail(params.id);
        const body = request.body();
        theTranch.start_date = body.start_date;
        theTranch.end_date = body.end_date;
        theTranch.origin = body.origin;
        theTranch.destination = body.destination;
        theTranch.route_id = body.route_id;
        theTranch.vehicle_driver_id = body.vehicle_driver_id;
        return await theTranch.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTranch: Tranch = await Tranch.findOrFail(params.id);
            response.status(204);
            return await theTranch.delete();
    }
}

