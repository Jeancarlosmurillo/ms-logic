import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';
import Driver from 'App/Models/Driver';
import UserService from 'App/Services/user_service';
import DriverValidator from 'App/Validators/DriverValidator';

@inject()
export default class DriversController {
    constructor(protected userService: UserService){}
    public async find({ request, params, response }: HttpContextContract) {
        if (params.id) {
            let theDriver: Driver = await Driver.findOrFail(params.id)  //Visualizar un solo elemento 
            let user = await this.userService.getUserById(theDriver.user_id)
            console.log("user", user.data)
            console.log("driver", theDriver.$attributes)
            let respuesta ={...theDriver.$attributes, ...user.data}
            return response.status(200).send(respuesta)
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); //Lista los primeros 20
                return await Driver.query().paginate(page, perPage)
            } else {
                return await Driver.query()
            } //Devuelve todos los elementos 

        }

    }
    public async create({ request, response }: HttpContextContract) {
        await request.validate(DriverValidator) //Validador
        const body = request.body();
        const {name, email, password, license , license_type} = body
        let user = {
            name: name,
            email: email,
            password: password,
        };
        let mensaje = {};
        try {
            let respuesta = await this.userService.postUser(user);
            let usuarioCreado = respuesta.data;
            let driver: ModelObject = { user_id: usuarioCreado._id, license: license, license_type: license_type };
            const driverNew = await Driver.create(driver);
            mensaje = {
                message: "Driver created successfully",
                data: driverNew,
            };
        } catch (error) {
            console.log("error", error);
            return response.status(400).send({ message: "User not found" });
        }

    return response.status(201).send(mensaje);
    } 

    public async update({ params, request }: HttpContextContract) {
        await request.validate(DriverValidator) //Validador
        const theDriver: Driver = await Driver.findOrFail(params.id);
        const body = request.body();
        theDriver.license = body.license;
        theDriver.license_type = body.license_type;
        return await theDriver.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id);
        try{
            //Llamar el ms-seguridad al metodo de eliminación
            await this.userService.deleteUser(theDriver.user_id)
          }catch (error){
            return response.status(400).send({ message: "Failed to delete user in ms-seguridad" });
          }
            response.status(204).send("Uusario eliminado correctamente");
          return await theDriver.delete();
        }
}

