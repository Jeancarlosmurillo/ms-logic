import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NaturalPerson from 'App/Models/NaturalPerson';
import NaturalPersonValidator from 'App/Validators/NaturalPersonValidator';

export default class NaturalPeopleController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id)
            await theNaturalPerson.load('user');
            return theNaturalPerson;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await NaturalPerson.query().paginate(page, perPage)
            } else {
                return await NaturalPerson.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(NaturalPersonValidator);
        const body = request.body();
        const theNaturalPerson: NaturalPerson = await NaturalPerson.create(body);
        await theNaturalPerson.load('user');
        return theNaturalPerson;
    }

    public async update({ params, request }: HttpContextContract) {
        const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
        const body = request.body();
        theNaturalPerson.user_id = body.user_id
        return await theNaturalPerson.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
        response.status(204);
        return await theNaturalPerson.delete();
    }
}