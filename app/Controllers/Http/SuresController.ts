import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sure from 'App/Models/Sure';

export default class SuresController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSure: Sure = await Sure.findOrFail(params.id)
            await theSure.load("vehicle");
            return theSure; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Sure.query().preload('vehicle').paginate(page, perPage)
            } else {
                return await Sure.query().preload('vehicle')
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theSure: Sure = await Sure.create(body);
        await theSure.load("vehicle")
        return theSure;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSure: Sure = await Sure.findOrFail(params.id);
        const body = request.body();
        theSure.vehicle_id = body.vehicle_id;
        theSure.policy_number = body.policy_number;
        theSure.issue_date = body.issue_date;
        theSure.expiration_date = body.expiration_date;
        theSure.value = body.value;
        theSure.validity = body.validity;
        theSure.insurance_company = body.insurance_company;
        theSure.payment_status = body.payment_status;
        return await theSure.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSure: Sure = await Sure.findOrFail(params.id);
            response.status(204);
            return await theSure.delete();
    }
}
