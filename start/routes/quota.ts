import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/quotas", "QuotasController.find");
  Route.get("/quotas/:id", "QuotasController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/quotas", "QuotasController.create"); //crearlos
  Route.put("/quotas/:id", "QuotasController.update"); //actualizar recibe id
  Route.delete("/quotas/:id", "QuotasController.delete"); //borrar, recibe id
}); //.middleware(['security']);
