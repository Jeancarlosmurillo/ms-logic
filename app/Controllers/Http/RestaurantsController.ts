import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurant from 'App/Models/Restaurant';

export default class RestaurantsController { 
    public async find({ request, params }: HttpContextContract) {
    if (params.id) {
        let theRestaurant: Restaurant = await Restaurant.findOrFail(params.id)
        await theRestaurant.load("travel_expenses");
        return theRestaurant; // Visualizar un solo elemento 
    } else {
        const data = request.all()
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1); // Paginas 
            const perPage = request.input("per_page", 20); // Lista los primeros 20
            return await Restaurant.query().paginate(page, perPage)
        } else {
            return await Restaurant.query()
        } // Devuelve todos los elementos 

    }

}
public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theRestaurant: Restaurant = await Restaurant.create(body);
    return theRestaurant;
}

public async update({ params, request }: HttpContextContract) {
    const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
    const body = request.body();
    theRestaurant.name = body.name;
    return await theRestaurant.save();
}

public async delete({ params, response }: HttpContextContract) {
    const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
        response.status(204);
        return await theRestaurant.delete();
}
}
