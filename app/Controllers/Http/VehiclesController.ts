 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle';

export default class VehiclesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thevehicle: Vehicle = await Vehicle.findOrFail(params.id)
            return thevehicle; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Vehicle.query().paginate(page, perPage)
            } else {
                return await Vehicle.query()
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thevehicle: Vehicle = await Vehicle.create(body);
        return thevehicle;
    }

    public async update({ params, request }: HttpContextContract) {
        const thevehicle: Vehicle = await Vehicle.findOrFail(params.id);
        const body = request.body();
        thevehicle.plate = body.plate;
        thevehicle.type = body.type;
        thevehicle.capacitity = body.capacitity;
        thevehicle.state = body.state;
        thevehicle.current_location = body.current_location;
        return await thevehicle.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thevehicle: Vehicle = await Vehicle.findOrFail(params.id);
            response.status(204);
            return await thevehicle.delete();
    }
}
