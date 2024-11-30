import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shift from 'App/Models/Shift';
import ShiftValidator from 'App/Validators/ShiftValidator';

export default class ShiftsController {

    /*public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theShift: Shift = await Shift.findOrFail(params.id)
            await theShift.load('driver',(Driver)=>{Driver.preload('user')})
            return theShift; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Shift.query().preload('driver',(Driver)=>{Driver.preload('user')}).paginate(page, perPage)
            } else {
                return await Shift.query()
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(ShiftValidator) //Validador
        const body = request.body();
        const theShift: Shift = await Shift.create(body);
        await theShift.load('driver',(Driver)=>{Driver.preload('user')})
        return theShift;
    }*/

    public async update({ params, request }: HttpContextContract) {
        await request.validate(ShiftValidator) //Validador
        const theShift: Shift = await Shift.findOrFail(params.id);
        const body = request.body();
        theShift.type_shift = body.type_shift;
        theShift.status = body.status;
        theShift.start_date = body.start_date;
        theShift.end_date = body.end_date;
        theShift.driver_id =body.driver_id;
        return await theShift.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theShift: Shift = await Shift.findOrFail(params.id);
            response.status(204);
            return await theShift.delete();
    }
}
