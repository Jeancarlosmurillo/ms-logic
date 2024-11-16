import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DistributionCentre from 'App/Models/DistributionCentre';
import DistributionCentreValidator from 'App/Validators/DistributionCentreValidator';

export default class DistributionCentresController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thedistributionCentre: DistributionCentre = await DistributionCentre.findOrFail(params.id)
           // await theDistributionCentre.load("municipality");
            return thedistributionCentre; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await DistributionCentre.query().paginate(page, perPage)
            } else {
                return await DistributionCentre.query()
            } 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(DistributionCentreValidator);
        const theDistributionCentre: DistributionCentre= await DistributionCentre.create(body);
       // await theDistributionCentre.load("municipality");
        return theDistributionCentre;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDistributionCentre: DistributionCentre = await DistributionCentre.findOrFail(params.id);
        const body = request.body();
        theDistributionCentre.name_centre = body.name_centre;
        theDistributionCentre.phone = body.phone;
        theDistributionCentre.municipality_id = body.municipality_id;
        theDistributionCentre.address_id = body.address_id;
        return await theDistributionCentre.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDistributionCentre: DistributionCentre = await DistributionCentre.findOrFail(params.id);
            response.status(204);
            return await theDistributionCentre.delete();
    }
}


