import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner';
import OwnerValidator from 'App/Validators/OwnerValidator';

export default class OwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOwner: Owner = await Owner.findOrFail(params.id)
            await theOwner.load("user");
            return theOwner; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Owner.query().preload('user').paginate(page, perPage)
            } else {
                return await Owner.query().preload('user')
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(OwnerValidator) //Validador
        const body = request.body();
        const theOwner: Owner = await Owner.create(body);
        await theOwner.load("user")
        return theOwner;
    }

    public async update({ params, request }: HttpContextContract) {
        await request.validate(OwnerValidator) //Validador
        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = request.body();
        theOwner.user_id = body.user_id;
        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
            response.status(204);
            return await theOwner.delete();
    }
}
