import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer';
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import CustomerValidator from 'App/Validators/CustomerValidator';

export default class CustomersController {
    public async find({ request, params }: HttpContextContract) {
        try {
            if (params.id) {
                let theCustomer: Customer = await Customer.findOrFail(params.id);
                return theCustomer;
                /*Se llama al MS_SECURITY para validar a los usuarios
                const userResponse = await axios.get(
                 `${Env.get("proyecto-prog-3")}/users/${theCustomer.user_id}`, 
                    {
                        headers: { Authorization: request.headers().authorization || "" },
                    }
                );
                if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
                    throw new Exception(
                        "No se encontró información del usuario en el sistema",
                        404
                    );
                } return { custromer: theCustomer, usuario: userResponse.data };*/
            } else {
                const data = request.all();
                if ("page" in data && "per_page" in data) {
                    const page = request.input("page", 1);
                    const perPage = request.input("per_page", 20);
                    return await Customer.query().paginate(page, perPage);
                } else {
                    return await Customer.query(); // Espera la respuesta de la base de datos
                }
            }
        } catch (error) {
            throw new Exception(
                error.message || "Error al procesar la solicitud",
                error.status || 500
            );
        }
    }

public async create({ request, response }: HttpContextContract) {
    //try {
        // Validar datos usando el ClienteValidator
        const body = request.body();
        /*// Llamada al MS_SECURITY para validar al usuario
        const userResponse = await axios.get(
            `${Env.get("proyecto-prog-3")}/users/${body.user_id}`, // cambiar 
            {
                headers: { Authorization: request.headers().authorization || "" },
            }
        );
        // Verificar si no se encontró información del usuario en el microservicio
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            return response.notFound({
                error:
                    "No se encontró información del usuario, verifique que el id sea correcto",
            });
        }
        // Crear el driver si la validación y la verificación de usuario son exitosas*/
        await request.validate(CustomerValidator);
        const theCustomer: Customer = await Customer.create(body);
        return theCustomer;
    } /*catch (error) {
        // Si el error es de validación, devolver los mensajes de error de forma legible
        if (error.messages) {
            return response.badRequest({ errors: error.messages.errors });
        }
        // Para cualquier otro tipo de error, lanzar una excepción genérica
        throw new Exception(
            error.message || "Error al procesar la solicitud",
            error.status || 500
        );
    }
}*/
    public async update({ params, request }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    const body = request.body();
    theCustomer.company_id=body.company_id;
    theCustomer.person_id = body.person_id;
    return await theCustomer.save();
}

public async delete({ params, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    await theCustomer.delete();
    return response.status(200).json({
        message:'Customer eliminado con éxito',
    });
}

}