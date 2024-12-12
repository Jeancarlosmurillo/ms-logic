import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Customer from "App/Models/Customer";
import UserService from "App/Services/user_service";
import CustomerValidator from "App/Validators/CustomerValidator";

@inject()
export default class AministratorsController {
  constructor(protected userService: UserService) {}
  public async find({ request, params, response }: HttpContextContract) {
    if (params.id) {
      let customer: Customer = await Customer.findOrFail(
        params.id
      );
      //se debe buscar el usuario al ms-seguridad y retornar el usuario con el administrador
      let user = await this.userService.getUserById(customer.user_id);
      console.log("user", user.data);
      console.log("customer", customer.$attributes);
      let respuesta = { ...customer.$attributes, ...user.data };
      return response.status(200).send(respuesta);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1); // Paginas
        const perPage = request.input("per_page", 20); // Lista los primeros 20
        return await Customer.query().paginate(page, perPage);
      } else {
        return await Customer.query();
      }
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(CustomerValidator);
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
      let customer: ModelObject = { user_id: usuarioCreado._id };
      const Cliente_creado = await Customer.create(customer);
      mensaje = {
        message: "customer created successfully",
        data: Cliente_creado,
      };
    } catch (error) {
      console.log("error", error);
      return response.status(400).send({ message: "User not found" });
    }

    return response.status(201).send(mensaje);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    const body = request.body();
    theCustomer.phone_number = body.phone_number;
    try {
      if (body.name || body.email) {
        //Actualizar el usuario, pero excluyendo la constraseña
        const { name, email } = body;
        const user = { name, email }; // Excluir password si existe en el body
        await this.userService.putUser(theCustomer.user_id, user);
        console.log('usuario a actualizar:', user.email, user.name)
      }
    } catch (error) {
      return response
        .status(400)
        .send({ message: "User not found or failed to update user" });
    }
    //Actualizar el nuevo usuario 
    let newCustomer: ModelObject = {};
    Object.keys(body).forEach( (key) => {
      if (Customer.$hasColumn(key) && key !== 'password') {
        newCustomer[key] = body[key];
      }
    });
    theCustomer.merge(newCustomer);
    return await theCustomer.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCustomer: Customer = await Customer.findOrFail(params.id);
    try{
      //Llamar el ms-seguridad al metodo de eliminación
      await this.userService.deleteUser(theCustomer.user_id)
    }catch (error){
      return response.status(400).send({ message: "Failed to delete user in ms-seguridad" });
    }
      response.status(204).send("Cliente eliminado correctamente");
    return await theCustomer.delete();
  }
}

/*
const { page, per_page } = request.only(["page", "per_page"]);
    const administrators: ModelObject[] = [];
    const metaAux: ModelObject[] = [];

    if (params.id) {
      const theAdministrator: Administrator = await Administrator.findOrFail(
        params.id
      );
      administrators.push(theAdministrator);
    } else if (page && per_page) {
      const { meta, data } = await Administrator.query()
        .paginate(page, per_page)
        .then((res) => res.toJSON());

      metaAux.push(meta);
      administrators.push(...data);
    } else {
      const allAdministrators = await Administrator.all();
      administrators.push(...allAdministrators);
    }

    await Promise.all(
      administrators.map(
        async (administrator: Administrator, index: number) => {
          const res = await this.userService.getUserById(administrator.user_id);
          const { name, email } = res.data;
          administrators[index] = {
            name,
            email,
            ...administrator.toJSON(),
          };
        }
      )
    );

    if (metaAux.length > 0) {
      return { meta: metaAux, data: administrators };
    }

 */
