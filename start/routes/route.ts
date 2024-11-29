import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/routes", "RoutesController.find"); //lisar solo uno
  Route.get("/routes/:id", "RoutesController.find"); //pedir routesss con id. 
  Route.post("/routes", "RoutesController.create"); //crearlos
  Route.put("/routes/:id", "RoutesController.update"); //actualizar recibe id
  Route.delete("/routes/:id", "RoutesController.delete"); //borrar, recibe id
})//.middleware(['security']);