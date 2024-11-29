import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import Administrator from "App/Models/Administrator";
import UserService from "App/Services/user_service";
import AdministratorValidator from "App/Validators/AdministratorValidator";

@inject()
export default class AministratorsController {
  constructor(protected userService: UserService) {}
  public async find({ request, params }: HttpContextContract) {
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

    return administrators;
  }
  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(AdministratorValidator);
    const { name, email, password } = body;
    let user = {
      name: name,
      email: email,
      password: password,
    };
    try {
      let respuesta = await this.userService.postUser(user);
      let usuarioCreado = respuesta.data;
      let administrator: ModelObject = { user_id: usuarioCreado._id };
      console.log("usuarioCreado", usuarioCreado);
      console.log("administrator", administrator);
    } catch (error) {
      console.log("error", error);
      return response.status(400).send({ message: "User not found" });
    }

    return { message: "Administrator created successfully" };
  }

  public async update({ params, request, response }: HttpContextContract) {
    const theAdAdministrator: Administrator = await Administrator.findOrFail(
      params.id
    );
    const body = request.body();
    try {
      if (body.name && body.email) {
        const user = { name: body.name, email: body.email };
        await this.userService.putUser(theAdAdministrator.user_id, user);
      }
    } catch (error) {
      return response
        .status(400)
        .send({ message: "User not found or failed to update user" });
    }
    let newAdministrator: ModelObject = {};
    Object.keys(body).forEach(
      (key) =>
        Administrator.$hasColumn(key) && (newAdministrator[key] = body[key])
    );
    theAdAdministrator.merge(newAdministrator);
    return await theAdAdministrator.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAdAdministrator: Administrator = await Administrator.findOrFail(
      params.id
    );
    response.status(204);
    return await theAdAdministrator.delete();
  }
}
