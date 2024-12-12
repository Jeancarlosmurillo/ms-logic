import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehiclesDriver from 'App/Models/VehiclesDriver';
import VehiclesDriverValidator from 'App/Validators/VehiclesDriverValidator';

export default class VehiclesDriversController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theVehiclesDriver: VehiclesDriver = await VehiclesDriver.findOrFail(params.id)
           // await theVehiclesDriver.load('vehicle')
           // await theVehiclesDriver.load('driver', (driver)=>{driver.preload('user')})
            return theVehiclesDriver; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await VehiclesDriver.query().paginate(page, perPage)
            } else {
                return await VehiclesDriver.query()
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        //await request.validate(VehiclesDriverValidator) //Validador
        const body = request.body();
        const theVehiclesDriver: VehiclesDriver = await VehiclesDriver.create(body);
        await theVehiclesDriver.load('vehicle')
        //await theVehiclesDriver.load('driver', (driver)=>{driver.preload('user')})
        return theVehiclesDriver;
    }

    public async update({ params, request }: HttpContextContract) {
        //await request.validate(VehiclesDriverValidator) //Validador
        const theVehiclesDriver: VehiclesDriver = await VehiclesDriver.findOrFail(params.id);
        const body = request.body();
        theVehiclesDriver.assignment_date = body.assignment_date;
        theVehiclesDriver.vehicle_id = body.vehicle_id;
        theVehiclesDriver.driver_id = body.driver_id;
        return await theVehiclesDriver.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theVehiclesDriver: VehiclesDriver = await VehiclesDriver.findOrFail(params.id);
            response.status(204);
            return await theVehiclesDriver.delete();
    }

}

