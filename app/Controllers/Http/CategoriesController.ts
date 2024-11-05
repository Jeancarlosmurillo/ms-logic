import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import CategoryValidator from 'App/Validators/CategoryValidator';

export default class CategoriesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theCategory: Category = await Category.findOrFail(params.id); 
          await theCategory.load("category")
          return theCategory;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);  
            return await Category.query().paginate(page, perPage);  //cuando hace la consulta se hace en ese rango de pagina
          } else {
            return await Category.query(); //es para que espere a la base de datos
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(CategoryValidator);
        const body = request.body();
        const theCategory: Category = await Category.create(body);
        return theCategory;
      }
    
      public async update({ params, request }: HttpContextContract) {   
        const theCategory: Category = await Category.findOrFail(params.id);  //busque el teatro con el identificador
        const body = request.body(); //leer lo que viene en la carta
        theCategory.name = body.name;  //de lo que está en la base de datos, actualice con lo que viene dentro del body
        theCategory.description = body.description;
        theCategory.category_id = body.category_id;
        return await theCategory.save(); //se confirma a la base de datos el cambio
      }
    
      public async delete({ params, response }: HttpContextContract) {  //
        const theCategory: Category = await Category.findOrFail(params.id); //buscarlo
        response.status(204);
        return await theCategory.delete(); //el teatro que se encontro, eliminelo
    }
}
