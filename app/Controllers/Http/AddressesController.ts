import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address';
import AddressValidator from 'App/Validators/AddressValidator';


export default class AddressesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAddress: Address = await Address.findOrFail(params.id)
           // await theAddress.load("theater");
            return theAddress; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Address.query().paginate(page, perPage)
            } else {
                return await Address.query()
            } 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(AddressValidator);
        const theAddress: Address= await Address.create(body);

        return theAddress;
    }

    public async update({ params, request }: HttpContextContract) {
        const theAddress: Address = await Address.findOrFail(params.id);
        const body = request.body();
        theAddress.neighborhood = body.neighborhood;
        theAddress.street = body.street;
        theAddress.door_number = body.door_number;
        theAddress.municipality_id = body.municipality_id;
        return await theAddress.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAddress: Address = await Address.findOrFail(params.id);
            response.status(204);
            return await theAddress.delete();
    }
}

