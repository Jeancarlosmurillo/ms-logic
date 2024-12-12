import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

import "./routes/departaments";
import "./routes/municipalities";
import "./routes/addresses";
import "./routes/distribution_centres";

import "./routes/category"; //registro de la ruta de categorias
import "./routes/product"; //registro de la ruta de productos
import "./routes/categoryProducts"; //registro de la ruta de categoria de los productos
import "./routes/quota"; //registro de la ruta de los pagos
import "./routes/bill"; //registro de la ruta de las facturas
import "./routes/customer"; //registro de la ruta de los clientes
import "./routes/company";
import "./routes/naturalPerson";

import "./routes/contract"; //registro de la ruta de contratos
import "./routes/vehicle"; //registro de la ruta de vehiculos
import "./routes/driver";
import "./routes/shifts";
import "./routes/vehiclesdriver";
import "./routes/sure";
import "./routes/order";
import "./routes/route";
import "./routes/operations";
import "./routes/restaurants";
import "./routes/hotels";
import "./routes/travel_expenses";
import "./routes/administrators";
import "./routes/spents";
import "./routes/owner";
import "./routes/ownerVehicle";
import "./routes/services";
import "./routes/tranches";
import "./routes/lot";
