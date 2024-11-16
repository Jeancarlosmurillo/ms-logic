import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TravelExpense from 'App/Models/TravelExpense';
//import TravelExpenseValidator from 'App/Validators/TravelExpenseValidator';

export default class TravelExpensesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTravelExpense:TravelExpense = await TravelExpense.findOrFail(params.id)
            await theTravelExpense.load("restaurant");
            await theTravelExpense.load("hotel");
            return theTravelExpense; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await TravelExpense.query().paginate(page, perPage)
            } else {
                return await TravelExpense.query()
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thetrTravelExpense:TravelExpense= await TravelExpense.create(body);
        await thetrTravelExpense.load("restaurant");
        await thetrTravelExpense.load("hotel");
        return thetrTravelExpense;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTravelExpense:TravelExpense = await TravelExpense.findOrFail(params.id);
        const body = request.body();
        theTravelExpense.restaurant_id = body.restaurant_id;
        theTravelExpense.hotel_id = body.hotel_id;
        theTravelExpense.amount_hotel = body.amount_hotel;
        theTravelExpense.amount_restaurant = body.amount_restaurant;
        theTravelExpense.date_service_hotel = body.date_service_hotel;
        theTravelExpense.date_service_restaurant = body.date_service_restaurant;
        return await theTravelExpense.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTravelExpense:TravelExpense = await TravelExpense.findOrFail(params.id);
            response.status(204);
            return await theTravelExpense.delete();
    }
}
