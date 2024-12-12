import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';
import Owner from 'App/Models/Owner';
import UserService from 'App/Services/user_service';
import OwnerValidator from 'App/Validators/OwnerValidator';

@inject()
export default class OwnersController {
    constructor(protected userService : UserService) {}
    public async find({ request, params, response }: HttpContextContract) {
        if (params.id) {
            let theOwner: Owner = await Owner.findOrFail(params.id)
            // Se debe de buscar el usuario al ms-segurity y retonar esa info
            let user = await this.userService.getUserById(theOwner.user_id)
            console.log("user", user.data)
            console.log("owner", theOwner.$attributes)
            let respuesta ={...theOwner.$attributes, ...user.data}
            return response.status(200).send(respuesta)
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Owner.query().paginate(page, perPage)
            } else {
                return await Owner.query()
            } //Devuelve todos los elementos 

        }
        

    }
    public async create({ request, response }: HttpContextContract) {
        const body = await request.validate(OwnerValidator) //Validador
        const { name, email, password } = body;
        let user = {
        name: name,
        email: email,
        password: password,
        };
        let mensaje = {};
        try {
            let respuesta = await this.userService.postUser(user);
            let usuarioCreado = respuesta.data;
            let owner : ModelObject = {user_id: usuarioCreado._id}
            const ownernew = await Owner.create(owner)
            mensaje = {messaage: "Owner created successfully" , 
                        data: ownernew
                    };
        } catch(error){
            console.log("error", error);
            return response.status(400).send({ message: "User not found" });
    }

    return response.status(201).send(mensaje);
    }

    public async update({ params, request, response }: HttpContextContract) {
        await request.validate(OwnerValidator) //Validador
        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = request.body();
        try{
            if (body.name || body.email) {
                //Actualizar el usuario, pero excluyendo la constraseña
                const { name, email } = body;
                const user = { name, email }; // Excluir password si existe en el body
                await this.userService.putUser(theOwner.user_id, user);
                console.log('usuario a actualizar:', user.email, user.name)
        }
    }catch(error){
        return response
        .status(400)
        .send({ message: "User not found or failed to update user" });
    }
    //Actualizar el nuevo usuario 
    let newAdministrator: ModelObject = {};
    Object.keys(body).forEach( (key) => {
      if (Owner.$hasColumn(key) && key !== 'password') {
        newAdministrator[key] = body[key];
      }
    });
        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        try{
            //Llamar al ms-seguridad el metodo de liminación
            await this.userService.deleteUser(theOwner.user_id)
        }catch (error){
            return response.status(400).send({ message: "Failed to delete user in ms-seguridad" });
        }    
        response.status(204).send("Usuario eliminado correctamente");
        return await theOwner.delete();
    }
}

