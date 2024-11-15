import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Contract from "App/Models/Contract";
import ContractValidator from 'App/Validators/ContractValidator';

export default class ContractsController {

        public async find({ request, params }: HttpContextContract) {
            if (params.id) {
                let theContract: Contract = await Contract.findOrFail(params.id)
                await theContract.load("customer");
                await theContract.load("order");
                return theContract; // Visualizar un solo elemento 
            } else {
                const data = request.all()
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1); // Paginas 
                    const perPage = request.input("per_page", 20); // Lista los primeros 20
                    return await Contract.query().preload('customer').paginate(page, perPage)
                } else {
                    return await Contract.query().preload('customer')
                } // Devuelve todos los elementos 
    
            }
    
        }
        public async create({ request }: HttpContextContract) {
            await request.validate(ContractValidator) //Validador
            const body = request.body();
            const theContract: Contract = await Contract.create(body);
            await theContract.load('customer')
            return theContract;
        }
    
        public async update({ params, request }: HttpContextContract) {
            await request.validate(ContractValidator) //Validador
            const theContract: Contract = await Contract.findOrFail(params.id);
            const body = request.body();
            theContract.description = body.description;
            theContract.date = body.date;
            theContract.customer_id = body.customer_id;
            theContract.order_id = body.order_id;
            return await theContract.save();
        }
    
        public async delete({ params, response }: HttpContextContract) {
            const theContract: Contract = await Contract.findOrFail(params.id);
                response.status(204);
                return await theContract.delete();
        }
    
}
