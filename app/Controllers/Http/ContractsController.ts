import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

import Contract from "App/Models/Contract";
import NotificationService from 'App/Services/NotificationServices';
import ContractValidator from 'App/Validators/ContractValidator';

export default class ContractsController {

        public async find({ request, params }: HttpContextContract) {
            if (params.id) {
                let theContract: Contract = await Contract.findOrFail(params.id)
                await theContract.load("customer", (Customer) => {
                    Customer.preload('NaturalPerson')
                    Customer.preload('companies', (Company) => Company.preload('naturalperson'))
                  });
                await theContract.load("order");
                return theContract; // Visualizar un solo elemento 
            } else {
                const data = request.all()
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1); // Paginas 
                    const perPage = request.input("per_page", 20); // Lista los primeros 20
                    return await Contract.query().preload('customer', (Customer) => {
                        Customer.preload('NaturalPerson')
                        Customer.preload('companies', (Company) => Company.preload('naturalperson'))}).paginate(page, perPage)
                } else {
                    return await Contract.query().preload('customer', (Customer) => {
                        Customer.preload('NaturalPerson')
                        Customer.preload('companies', (Company) => Company.preload('naturalperson'))})
                } // Devuelve todos los elementos 
    
            }
    
        }

        public async create({ request, response }: HttpContextContract) {
          await request.validate(ContractValidator); // Validador
          const body = request.body();
          const theContract = await Contract.create(body);
        
          try {
            // Consulta para obtener los datos necesarios
            const result = await Database
            .from('contracts')
            .innerJoin('customers', 'contracts.customer_id', 'customers.id')
            .leftJoin('natural_people', 'customers.person_id', 'natural_people.id')
            .leftJoin('companies', 'customers.company_id', 'companies.id')
            .leftJoin('natural_people AS company_person', 'companies.person_id', 'company_person.id')
            .leftJoin('users', (query) => {
              query
                .on('natural_people.user_id', 'users.id')
                .orOn('company_person.user_id', 'users.id');
            })
              .select(
                'users.email AS user_email',
                'users.name AS user_name'
              )
              .where('contracts.id', theContract.id)
              .first(); // Solo devuelve el primer resultado
        
            if (!result) {
              return response.status(400).send({ error: 'Datos del contrato no encontrados' });
            }
        
            // Llamar al microservicio de notificaciones
            await NotificationService.new_contract(
              result.user_email,          // Correo del usuario
              theContract.description,// Descripción del contrato
              theContract.date,       // Fecha del contrato
              result.user_name            // Nombre del usuario
            );
        
          } catch (error) {
            console.error('Error al procesar la notificación:', error);
            return response.status(500).send({ error: 'Error al enviar la notificación' });
          }
        
          // Devolver el contrato creado
          return theContract;
        }
        
          
    
        public async update({ params, request }: HttpContextContract) {
            await request.validate(ContractValidator) //Validador
            const theContract: Contract = await Contract.findOrFail(params.id);
            const body = request.body();
            theContract.description = body.description;
            theContract.date = body.date;
            theContract.customer_id = body.customer_id;
            theContract.order_id = body.order_id;
            return await theContract.save();
        }
    
        public async delete({ params, response }: HttpContextContract) {
            const theContract: Contract = await Contract.findOrFail(params.id);
                response.status(204);
                return await theContract.delete();
        }
    
}
