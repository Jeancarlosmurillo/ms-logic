import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';

export default class UsersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theUser: User = await User.findOrFail(params.id)
            await theUser.load("administrator");
            return theUser; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await User.query().paginate(page, perPage)
            } else {
                return await User.query()
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(UserValidator);
        const theUser: User = await User.create(body);
        return theUser;
    }

    public async update({ params, request }: HttpContextContract) {
        const theUser: User = await User.findOrFail(params.id);
        const body = request.body();
        theUser.name = body.name;
        theUser.last_name = body.last_name;
        theUser.email = body.email;
        theUser.phone = body.phone;
        theUser.rol = body.rol;
        theUser.password=body.password;
        return await theUser.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theUser: User = await User.findOrFail(params.id);
            response.status(204);
            return await theUser.delete();
    }
}

