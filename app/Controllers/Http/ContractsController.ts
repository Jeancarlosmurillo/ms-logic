import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Contract from "App/Models/Contract";
import ContractValidator from "App/Validators/ContractsValidator";

export default class ContractsController {

        public async find({ request, params }: HttpContextContract) {
            if (params.id) {
                let theContract: Contract = await Contract.findOrFail(params.id)
                await theContract.load("route")
                return theContract; // Visualizar un solo elemento 
            } else {
                const data = request.all()
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1); // Paginas 
                    const perPage = request.input("per_page", 20); // Lista los primeros 20
                    return await Contract.query().paginate(page, perPage)
                } else {
                    return await Contract.query()
                } // Devuelve todos los elementos 
    
            }
    
        }
        public async create({ request }: HttpContextContract) {
            const body = await request.validate(ContractValidator);
            const theContract: Contract = await Contract.create(body);
            return theContract;
        }
    
        public async update({ params, request }: HttpContextContract) {
            const theContract: Contract = await Contract.findOrFail(params.id);
            const body = request.body();
            theContract.description = body.description;
            theContract.date = body.date;
            theContract.customer_id = body.customer_id;
            return await theContract.save();
        }
    
        public async delete({ params, response }: HttpContextContract) {
            const theContract: Contract = await Contract.findOrFail(params.id);
                response.status(204);
                return await theContract.delete();
        }
    
}
