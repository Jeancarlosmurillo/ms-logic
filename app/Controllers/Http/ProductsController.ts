 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/ProductValidator';

export default class ProductsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theProduct: Product = await Product.findOrFail(params.id); 
          return theProduct;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);  
            return await Product.query().paginate(page, perPage);  //cuando hace la consulta se hace en ese rango de pagina
          } else {
            return await Product.query(); //es para que espere a la base de datos
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(ProductValidator) 
        const body = request.body();
        const theProduct: Product = await Product.create(body);
        return theProduct;
      }

      public async update({ params, request }: HttpContextContract) {   
        const theProduct: Product = await Product.findOrFail(params.id);  //busque el teatro con el identificador
        const body = request.body(); //leer lo que viene en la carta
        theProduct.name = body.name;  //de lo que está en la base de datos, actualice con lo que viene dentro del body
        theProduct.description = body.description;
        theProduct.price = body.price;
        theProduct.cuantity = body.cuantity;
        theProduct.customer_id = body.customer_id
        return await theProduct.save(); //se confirma a la base de datos el cambio
      }
    
      public async delete({ params, response }: HttpContextContract) {  //
        const theProduct: Product = await Product.findOrFail(params.id); //buscarlo
        response.status(204);
        return await theProduct.delete(); //el teatro que se encontro, eliminelo
    }
}
