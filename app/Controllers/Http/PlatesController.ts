import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plate from 'App/Models/Plate';
import PlateValidator from 'App/Validators/PlateValidator';

export default class PlatesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thePlate: Plate = await Plate.findOrFail(params.id)
            return thePlate; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Plate.query().paginate(page, perPage)
            } else {
                return await Plate.query()
            } // Devuelve todos los elementos 
    
        }
    
    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(PlateValidator);
        const thePlate: Plate = await Plate.create(body);
        return thePlate;
    }
}
