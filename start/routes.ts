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

import "./routes/category" //registro de la ruta de categorias 
import "./routes/product" //registro de la ruta de productos 
import "./routes/categoryProducts" //registro de la ruta de categoria de los productos 
import "./routes/operations" //registro de la ruta de las operaciones 
import "./routes/payment" //registro de la ruta de los pagos   
import "./routes/bill" //registro de la ruta de las facturas 
import "./routes/customer" //registro de la ruta de los clientes 

import "./routes/contract" //registro de la ruta de contratos
import "./routes/vehicle" //registro de la ruta de vehiculos
import "./routes/driver"
import "./routes/shifts"
import "./routes/vehiclesdriver"
import "./routes/sure"
import "./routes/order"
import "./routes/route"
import "./routes/operations"
import "./routes/restaurants"
import "./routes/hotels"
import "./routes/travel_expenses"
import "./routes/users"
import "./routes/administrators"
import "./routes/spents"

