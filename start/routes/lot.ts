import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/lots", "LotsController.find");
  Route.get("/lots/:id", "LotsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/lots", "LotsController.create"); //crearlos
  Route.put("/lots/:id", "LotsController.update"); //actualizar recibe id
  Route.delete("/lots/:id", "LotsController.delete"); //borrar, recibe id
}).middleware(['security']);