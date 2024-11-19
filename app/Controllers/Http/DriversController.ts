import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver';
import DriverValidator from 'App/Validators/DriverValidator';

export default class DriversController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDriver: Driver = await Driver.findOrFail(params.id)
            await theDriver.load('user')
            return theDriver; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Driver.query().preload('user').paginate(page, perPage)
            } else {
                return await Driver.query()
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(DriverValidator) //Validador
        const body = request.body();
        const theDriver: Driver = await Driver.create(body);
        await theDriver.load('user')
        return theDriver;
    }

    public async update({ params, request }: HttpContextContract) {
        await request.validate(DriverValidator) //Validador
        const theDriver: Driver = await Driver.findOrFail(params.id);
        const body = request.body();
        theDriver.license = body.license;
        theDriver.license_type = body.license_type;
        theDriver.user_id = body.user_id;
        return await theDriver.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id);
            response.status(204);
            return await theDriver.delete();
    }
}
