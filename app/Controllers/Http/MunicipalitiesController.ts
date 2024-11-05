import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipality from 'App/Models/Municipality';

export default class MunicipalitiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let themunicipality: Municipality = await Municipality.findOrFail(params.id)
            await themunicipality.load("departament");
            return themunicipality; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Municipality.query().paginate(page, perPage)
            } else {
                return await Municipality.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMunicipality: Municipality= await Municipality.create(body);
        await theMunicipality.load("departament");
        return theMunicipality;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMunicipality: Municipality = await Municipality.findOrFail(params.id);
        const body = request.body();
        theMunicipality.name_municipality = body.name_municipality;
        theMunicipality.departament_id = body.departament_id;
        return await theMunicipality.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMunicipality: Municipality = await Municipality.findOrFail(params.id);
            response.status(204);
            return await theMunicipality.delete();
    }
}
