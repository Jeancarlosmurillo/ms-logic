import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/VehiclesDriver", "VehiclesDriversController.find"); //lisar solo uno
  Route.get("/VehiclesDriver/:id", "VehiclesDriversController.find"); //pedir VehiclesDrivers con id. 
  Route.post("/VehiclesDriver", "VehiclesDriversController.create"); //crearlos
  Route.put("/VehiclesDriver/:id", "VehiclesDriversController.update"); //actualizar recibe id
  Route.delete("/VehiclesDriver/:id", "VehiclesDriversController.delete"); //borrar, recibe id
}).middleware(['security']);