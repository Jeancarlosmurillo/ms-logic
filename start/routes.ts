/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/departaments'
import './routes/municipalities'
import './routes/addresses'
import './routes/distribution_centres'

import "./routes/category" // registro de la ruta de categorias 
import "./routes/product" // registro de la ruta de productos 
import "./routes/categoryProducts" // registro de la ruta de categoria de los productos 
// import "./routes/batch" // registro de la ruta de categoria de los lotes 
