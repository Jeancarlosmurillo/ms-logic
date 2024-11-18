import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Vehicles", "VehiclesController.find"); //lisar solo uno
  Route.get("/Vehicles/:id", "VehiclesController.find"); //pedir Vehicless con id. 
  Route.post("/Vehicles", "VehiclesController.create"); //crearlos
  Route.put("/Vehicles/:id", "VehiclesController.update"); //actualizar recibe id
  Route.delete("/Vehicles/:id", "VehiclesController.delete"); //borrar, recibe id
})