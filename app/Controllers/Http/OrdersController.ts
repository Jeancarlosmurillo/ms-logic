 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order';
import OrderValidator from 'App/Validators/OrderValidator';

export default class OrdersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOrder: Order = await Order.findOrFail(params.id)
            await theOrder.load('address', (address)=>{address.preload('municipality')});
            await theOrder.load('lot',(lot)=>{lot.preload('products')});
            await theOrder.load("route",(route)=>(route.preload('contract')));
            return theOrder; //Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Order.query().paginate(page, perPage)//.preload('contract').preload('vehicle')
            } else {
                return await Order.query().preload('route',(route)=>{route.preload('contract')}).preload('address', (address)=>{address.preload('municipality')}).preload('lot',(lot)=>{lot.preload('products')});
            } //Devuelve todos los elementos 
        }
    }
    public async create({ request }: HttpContextContract) {
        await request.validate(OrderValidator) //Validador
        const body = request.body();
        const theOrder: Order = await Order.create(body);
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
        theOrder.lot_id = body.lot_id;
        return await theOrder.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOrder: Order = await Order.findOrFail(params.id);
            response.status(204);
            return await theOrder.delete();
    }

}
