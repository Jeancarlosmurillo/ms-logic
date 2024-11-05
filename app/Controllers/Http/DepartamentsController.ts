import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Departament from "App/Models/Departament";

export default class DepartamentsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDepartament: Departament = await Departament.findOrFail(params.id)
           // await theDepartament.load("theater");
            return theDepartament; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Departament.query().paginate(page, perPage)
            } else {
                return await Departament.query()
            } 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theDepartament: Departament= await Departament.create(body);
        //await theDepartament.load("theater");
        return theDepartament;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDepartament: Departament = await Departament.findOrFail(params.id);
        const body = request.body();
        theDepartament.name_departament = body.name;
        return await theDepartament.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDepartament: Departament = await Departament.findOrFail(params.id);
            response.status(204);
            return await theDepartament.delete();
    }
}