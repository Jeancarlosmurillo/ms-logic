import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/drivers", "DriversController.find"); //lisar solo uno
  Route.get("/drivers/:id", "DriversController.find"); //pedir driverss con id. 
  Route.post("/drivers", "DriversController.create"); //crearlos
  Route.put("/drivers/:id", "DriversController.update"); //actualizar recibe id
  Route.delete("/drivers/:id", "DriversController.delete"); //borrar, recibe id
}).middleware(['security']);