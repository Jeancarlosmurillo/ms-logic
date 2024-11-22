import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import RestaurantPlate from 'App/Models/RestaurantPlate';
import NotificationService from 'App/Services/NotificationServices';
import RestaurantPlateValidator from 'App/Validators/RestaurantPlateValidator';
import { DateTime } from 'luxon';

export default class RestaurantPlatePlatesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRestaurantPlate: RestaurantPlate = await RestaurantPlate.findOrFail(params.id)
            await theRestaurantPlate.load("plate");
            await theRestaurantPlate.load('restaurant')
            return theRestaurantPlate; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await RestaurantPlate.query().preload('plate').preload('restaurant').paginate(page, perPage)
            } else {
                return await RestaurantPlate.query()
            } // Devuelve todos los elementos 
    
        }
    
    }
    public async create({ request, response }: HttpContextContract) {
        const body = await request.validate(RestaurantPlateValidator);
        const theRestaurantPlate: RestaurantPlate = await RestaurantPlate.create(body);
        await theRestaurantPlate.load("plate");
        await theRestaurantPlate.load('restaurant')
        try {
            // Consulta para obtener los datos necesarios
            const result = await Database
            .from('restaurant_plates')
        .innerJoin('restaurants', 'restaurant_plates.restaurant_id', 'restaurants.id')
        .innerJoin('plates', 'restaurant_plates.plate_id', 'plates.id')
        .innerJoin('services', 'restaurants.id', 'services.restaurant_id') // Asumiendo que tienes una tabla de servicios que se relaciona con la tabla restaurants
        .innerJoin('administrators', 'services.administrator_id', 'administrators.id') // Relación con la tabla administrators
        .innerJoin('users', 'administrators.user_id', 'users.id') // Relación con la tabla users para obtener el correo
        .select(
            'restaurants.name AS restaurant_name',
            'plates.name AS plate_name',
            'plates.description AS plate_description',
            'users.email AS admin_email')
            .where('restaurant_plates..id', theRestaurantPlate.id)
                .first(); // Obtener solo el primer resultado
                if (!result) {
                    return response.status(400).send({ error: 'Datos del contrato no encontrados' });
                }
        
            await NotificationService.send_plate(
                result.admin_email,
                result.restaurant_name,
                result.plate_name,
                result.plate_description,
                theRestaurantPlate.price,
            );
        }catch (error) {
            console.error('Error al procesar la notificación:', error);
            return response.status(500).send({ error: 'Error al enviar la notificación' });
          }
        return theRestaurantPlate;
    }
}
