import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Tranch from 'App/Models/Tranch';
import NotificationService from 'App/Services/NotificationServices';
//import RouteValidator from 'App/Validators/RouteValidator';

export default class RoutesController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTranch: Tranch = await Tranch.findOrFail(params.id)
            await theTranch.load("distribution_centre_origin");
            await theTranch.load("distribution_centre_destination");
            return theTranch; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Tranch.query().preload('distribution_centre_origin').preload('distribution_centre_destination').paginate(page, perPage)
            } else {
                return await Tranch.query().preload('distribution_centre_origin').preload('distribution_centre_destination')
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request, response }: HttpContextContract) {
       // await request.validate(TranchValidator) //Validador
        const body = request.body();
        const theTranch: Tranch = await Tranch.create(body);

      /*  try {
            // Consulta para obtener los datos necesarios
            const result = await Database
            .from('tranches')
            .innerJoin('routes','tranches.route_id', 'routes.id')
            .innerJoin('contracts', 'routes.contract_id', 'contracts.id')
            .innerJoin('customers', 'contracts.customer_id', 'customers.id')
            .leftJoin('natural_people', 'customers.person_id', 'natural_people.id')
            .leftJoin('companies', 'customers.company_id', 'companies.id')
            .leftJoin('natural_people AS company_person', 'companies.person_id', 'company_person.id')
            .leftJoin('users', (query) => {
                query
                    .on('natural_people.user_id', 'users.id')
                    .orOn('company_person.user_id', 'users.id');
            })
            .innerJoin('distribution_centres AS origin_centre', 'tranches.origin', 'origin_centre.id')
            .innerJoin('municipalities AS origin_municipality', 'origin_centre.municipality_id', 'origin_municipality.id')
            .innerJoin('distribution_centres AS destination_centre', 'tranches.destination', 'destination_centre.id')
            .innerJoin('municipalities AS destination_municipality', 'destination_centre.municipality_id', 'destination_municipality.id')
            .select(
            'users.email AS user_email',
            'origin_municipality.name_municipality AS origin',
            'destination_municipality.name_municipality AS destination'
        )
                .first(); // Obtener solo el primer resultado
                if (!result) {
                    return response.status(400).send({ error: 'Datos del contrato no encontrados' });
                }
        
            await NotificationService.send_tranch (
                result.user_email,
                theTranch.route_id,
                theTranch.start_date,
                theTranch.end_date ,
                result.origin,
                result.destination,
            );
        }catch (error) {
            console.error('Error al procesar la notificación:', error);
            return response.status(500).send({ error: 'Error al enviar la notificación' });
          }*/
        await theTranch.load("distribution_centre_origin")
        await theTranch.load("distribution_centre_destination")
        return theTranch;
    }

    public async update({ params, request }: HttpContextContract) {
        //await request.validate(TranchValidator) //Validador
        const theTranch: Tranch = await Tranch.findOrFail(params.id);
        const body = request.body();
        theTranch.start_date = body.start_date;
        theTranch.end_date = body.end_date;
        theTranch.origin = body.origin;
        theTranch.destination = body.destination;
        theTranch.route_id = body.route_id;
        theTranch.vehicle_driver_id = body.vehicle_driver_id;
        return await theTranch.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTranch: Tranch = await Tranch.findOrFail(params.id);
            response.status(204);
            return await theTranch.delete();
    }
}

