import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';
import NaturalPerson from 'App/Models/NaturalPerson';
import UserService from 'App/Services/user_service';
import NaturalPersonValidator from 'App/Validators/NaturalPersonValidator';

@inject()
export default class NaturalPeopleController {
    constructor(protected userService: UserService){}
    public async find({ request, params, response }: HttpContextContract) {
        if (params.id) {
            let theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id)
            //se debe buscar el usuario al ms-seguridad y retornar el usuario con el administrador
            let user = await this.userService.getUserById(theNaturalPerson.user_id);
            console.log("user", user.data);
            console.log("Natural Person", theNaturalPerson.$attributes);
            let respuesta = { ...theNaturalPerson.$attributes, ...user.data };
            return response.status(200).send(respuesta);
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

    public async create({ request, response }: HttpContextContract) {
        await request.validate(NaturalPersonValidator);
        const body = request.body();
        const {name, email, password} = body
        let user = {
            name: name,
            email: email,
            password: password,
        };
        let mensaje = {};
        try {
      let respuesta = await this.userService.postUser(user);
      let usuarioCreado = respuesta.data;
      let naturalPerson: ModelObject = { user_id: usuarioCreado._id };
      const naturalPersonNew = await naturalPerson.create(naturalPerson);
      mensaje = {
        message: "Person created successfully",
        data: naturalPersonNew,
      };
    } catch (error) {
      console.log("error", error);
      return response.status(400).send({ message: "User not found" });
    }

    return response.status(201).send(mensaje);
    }

    public async update({ params, request, response }: HttpContextContract) {
        const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
        const body = request.body();
        try {
            if (body.name || body.email) {
              //Actualizar el usuario, pero excluyendo la constraseña
              const { name, email } = body;
              const user = { name, email }; // Excluir password si existe en el body
              await this.userService.putUser(theNaturalPerson.user_id, user);
              console.log('usuario a actualizar:', user.email, user.name)
            }
          } catch (error) {
            return response
              .status(400)
              .send({ message: "User not found or failed to update user" });
          }
        //Actualizar el nuevo usuario 
    let newAdministrator: ModelObject = {};
    Object.keys(body).forEach( (key) => {
      if (NaturalPerson.$hasColumn(key) && key !== 'password') {
        newAdministrator[key] = body[key];
      }
    });
        return await theNaturalPerson.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
        try{
            //Llamar el ms-seguridad al metodo de eliminación
            await this.userService.deleteUser(theNaturalPerson.user_id)
          }catch (error){
            return response.status(400).send({ message: "Failed to delete user in ms-seguridad" });
          }
            response.status(204).send("Usuario eliminado correctamente");
        response.status(204);
        return await theNaturalPerson.delete();
    }
}
