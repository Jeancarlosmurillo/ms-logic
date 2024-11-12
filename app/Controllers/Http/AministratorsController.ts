import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator';

export default class AministratorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAdAdministrator:Administrator = await Administrator.findOrFail(params.id)
            await theAdAdministrator.load("user");
            return theAdAdministrator; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Administrator.query().paginate(page, perPage)
            } else {
                return await Administrator.query()
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theAdAdministrator:Administrator= await Administrator.create(body);
        await theAdAdministrator.load("user");
        return theAdAdministrator;
    }

    public async update({ params, request }: HttpContextContract) {
        const theAdAdministrator:Administrator = await Administrator.findOrFail(params.id);
        const body = request.body();
        theAdAdministrator.user_id = body.user_id;
        return await theAdAdministrator.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAdAdministrator:Administrator = await Administrator.findOrFail(params.id);
            response.status(204);
            return await theAdAdministrator.delete();
    }
}

