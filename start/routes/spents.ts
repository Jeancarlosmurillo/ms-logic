import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/spents", "SpentsController.find"); //lisar solo uno
  Route.get("/spents/:id", "SpentsController.find"); //pedir spentss con id. 
  Route.post("/spents", "SpentsController.create"); //crearlos
  Route.put("/spents/:id", "SpentsController.update"); //actualizar recibe id
  Route.delete("/spents/:id", "SpentsController.delete"); //borrar, recibe id
})//.middleware(['security']);