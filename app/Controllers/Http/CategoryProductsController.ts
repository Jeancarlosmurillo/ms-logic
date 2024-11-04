import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryProduct from 'App/Models/CategoryProduct';
import CategoryProductValidator from 'App/Validators/CategoryProductValidator';

export default class CategoryProductsProductsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id); 
          return theCategoryProduct;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);  
            return await CategoryProduct.query().paginate(page, perPage);  //cuando hace la consulta se hace en ese rango de pagina
          } else {
            return await CategoryProduct.query(); //es para que espere a la base de datos
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(CategoryProductValidator)
        const body = request.body();
        const theCategoryProduct: CategoryProduct = await CategoryProduct.create(body);
        return theCategoryProduct;
      }
    
      public async update({ params, request }: HttpContextContract) {   
        const theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id);  //busque el teatro con el identificador
        const body = request.body(); //leer lo que viene en la carta
        theCategoryProduct.category_id = body.category_id;  //de lo que está en la base de datos, actualice con lo que viene dentro del body
        theCategoryProduct.product_id= body.product_id;
        return await theCategoryProduct.save(); //se confirma a la base de datos el cambio
      }
    
      public async delete({ params, response }: HttpContextContract) {  //
        const theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id); //buscarlo
        response.status(204);
        return await theCategoryProduct.delete(); //el teatro que se encontro, eliminelo
      }
}
