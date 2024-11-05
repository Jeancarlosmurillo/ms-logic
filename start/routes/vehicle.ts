import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Vehicless", "VehiclessController.find"); //lisar solo uno
  Route.get("/Vehicless/:id", "VehiclessController.find"); //pedir Vehicless con id. 
  Route.post("/Vehicless", "VehiclessController.create"); //crearlos
  Route.put("/Vehicless/:id", "VehiclessController.update"); //actualizar recibe id
  Route.delete("/Vehicless/:id", "VehiclessController.delete"); //borrar, recibe id
});