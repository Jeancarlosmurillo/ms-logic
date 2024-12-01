 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Order from 'App/Models/Order';
import NotificationService from 'App/Services/NotificationServices';
import OrderValidator from 'App/Validators/OrderValidator';

export default class OrdersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOrder: Order = await Order.findOrFail(params.id)
            await theOrder.load('address', (address)=>{address.preload('municipality')});
            await theOrder.load("route",(route)=>(route.preload('contract')));
            return theOrder; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Order.query().paginate(page, perPage)
            } else {
                return await Order.query().preload('route',(route)=>{route.preload('contract')}).preload('address', (address)=>{address.preload('municipality')});
            } //Devuelve todos los elementos 
        }
    }
    public async create({ request, response }: HttpContextContract) {
        await request.validate(OrderValidator) //Validador
        const body = request.body();
        const theOrder: Order = await Order.create(body);
        await theOrder.load('address');
        try {
            // Consulta para obtener los datos necesarios
            const result = await Database
            .from('orders')
            .innerJoin('contracts', 'orders.contract_id', 'contracts.id')
            .innerJoin('customers', 'contracts.customer_id', 'customers.id')
            .leftJoin('natural_people', 'customers.person_id', 'natural_people.id')
            .leftJoin('companies', 'customers.company_id', 'companies.id')
            .leftJoin('natural_people AS company_person', 'companies.person_id', 'company_person.id')
            .leftJoin('users', (query) => {
                query
                    .on('natural_people.user_id', 'users.id')
                    .orOn('company_person.user_id', 'users.id');
            })
            .innerJoin('addresses', 'orders.address_id', 'addresses.id')
            .innerJoin('municipalities', 'addresses.municipality_id', 'municipalities.id')
            .innerJoin('departaments', 'municipalities.departament_id', 'departaments.id')
            .select('users.email AS user_email','addresses.street AS direction','municipalities.name_municipality','departaments.name_departament')
                .where('orders.id', theOrder.id) // Filtrar por el ID de la orden creada
                .first(); // Obtener solo el primer resultado
                if (!result || !result.direction || !result.name_municipality || !result.name_departament) {
                    return response.status(400).send({ error: 'Datos incompletos en el contrato o dirección' });
                }
                console.log('Resultado de la consulta:', result);
    
        
            await NotificationService.send_order(
                result.user_email,
                theOrder.route_id,
                theOrder.contract_id,
                theOrder.date_order,
                theOrder.type,
                result.direction,
                result.name_municipality, 
                result.name_departament
            );
        }catch (error) {
            console.error('Error al procesar la notificación:', error);
            return response.status(500).send({ error: 'Error al enviar la notificación' });
          }
          

        await theOrder.load('address');
        await theOrder.load('lot');
        await theOrder.load("contract");
        return theOrder;
    }

    public async update({ params, request }: HttpContextContract) {
        await request.validate(OrderValidator) //Validador
        const theOrder: Order = await Order.findOrFail(params.id);
        const body = request.body();
        theOrder.type = body.type;
        theOrder.date_order = body.date_order;
        theOrder.address_id = body.address_id;
        theOrder.route_id = body.route_id;
        return await theOrder.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOrder: Order = await Order.findOrFail(params.id);
            response.status(204);
            return await theOrder.delete();
    }

}
