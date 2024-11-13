import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operation from 'App/Models/Operation';

export default class OperationsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theoperation:Operation = await Operation.findOrFail(params.id)
            await theoperation.load('municipality')
            await theoperation.load('vehicle')
            return theoperation; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Operation.query().preload('vehicle').preload('municipality').paginate(page, perPage)
            } else {
                return await Operation.query().preload('vehicle').preload('municipality')
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theOpeOperation:Operation = await Operation.create(body);
        return theOpeOperation;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOpeOperation:Operation = await Operation.findOrFail(params.id);
        const body = request.body();
        theOpeOperation.municipality_id = body.municipality_id;
        theOpeOperation.vehicle_id = body.vehicle_id;
        return await theOpeOperation.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOpeOperation:Operation = await Operation.findOrFail(params.id);
            response.status(204);
            return await theOpeOperation.delete();
    }
}

