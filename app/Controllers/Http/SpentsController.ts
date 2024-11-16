import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Spent from 'App/Models/Spent';

export default class SpentsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSpent:Spent = await Spent.findOrFail(params.id)
            await theSpent.load("travel_expense");
            await theSpent.load("driver");
            await theSpent.load('owner');
           // await theSpent.load('service')
            return theSpent; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Spent.query().preload('travel_expense').preload('driver').paginate(page, perPage)
            } else {
                return await Spent.query().preload('travel_expense').preload('driver')
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
      //  await request.validate(SpentValidator) //Validador
        const body = request.body();
        const theSpent:Spent = await Spent.create(body);
        await theSpent.load("travel_expense")
        await theSpent.load("driver")
        return theSpent;
    }

    public async update({ params, request }: HttpContextContract) {
       // await request.validate(SpentValidator) //Validador
        const theSpent:Spent = await Spent.findOrFail(params.id);
        const body = request.body();
        theSpent.driver_id = body.driver_id;
        theSpent.owner_id = body.owner_id;
        theSpent.travel_expense_id = body.travel_expense_id;
        theSpent.service_id = body.service_id;
        return await theSpent.save();
    }



    public async delete({ params, response }: HttpContextContract) {
        const theSpent:Spent = await Spent.findOrFail(params.id);
            response.status(204);
            return await theSpent.delete();
    }
}
