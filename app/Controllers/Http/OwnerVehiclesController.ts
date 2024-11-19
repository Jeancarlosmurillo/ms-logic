import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OwnerVehicle from 'App/Models/OwnerVehicle';
import OwnerVehicleValidator from 'App/Validators/OwnerVehicleValidator';

export default class OwnerVehiclesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id)
            await theOwnerVehicle.load("owner",(Owner)=>{Owner.preload('user')});
            await theOwnerVehicle.load("vehicle");
            return theOwnerVehicle; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await OwnerVehicle.query().preload('owner', (Owner)=>{Owner.preload('user')}).preload('vehicle').paginate(page, perPage)
            } else {
                return await OwnerVehicle.query().preload('owner', (Owner)=>{Owner.preload('user')}).preload('vehicle')
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(OwnerVehicleValidator) //Validador
        const body = request.body();
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.create(body);
        await theOwnerVehicle.load("owner", (Owner)=>{Owner.preload('user')})
        await theOwnerVehicle.load("vehicle")
        return theOwnerVehicle;
    }

    public async update({ params, request }: HttpContextContract) {
        await request.validate(OwnerVehicleValidator) //Validador
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
        const body = request.body();
        theOwnerVehicle.owner_id = body.owner_id;
        theOwnerVehicle.vehicle_id = body.vehicle_id;
        theOwnerVehicle.assignment_date = body.assignment_date;
        return await theOwnerVehicle.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
            response.status(204);
            return await theOwnerVehicle.delete();
    }
}
