 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service';
import ServiceValidator from 'App/Validators/ServiceValidator';

export default class ServicesController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theService: Service = await Service.findOrFail(params.id)
            await theService.load("contract");
            await theService.load("administrator");
            //await theService.load("")
            return theService; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Service.query().preload('contract').preload('administrator').paginate(page, perPage)
            } else {
                return await Service.query().preload('contract').preload('administrator')
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(ServiceValidator) //Validador
        const body = request.body();
        const theService: Service = await Service.create(body);
        await theService.load("contract")
        await theService.load("administrator")
        //await theService.load("")
        return theService;
    }

    public async update({ params, request }: HttpContextContract) {
        await request.validate(ServiceValidator) //Validador
        const theService: Service = await Service.findOrFail(params.id);
        const body = request.body();
        theService.amount = body.amount
        theService.date_service = body.date_service
        theService.contract_id = body.contract_id;
        theService.administrator_id = body.administrator_id
        theService.tranch_id = body.trach_id;
        return await theService.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id);
            response.status(204);
            return await theService.delete();
    }


}
