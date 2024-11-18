import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/payments", "PaymentsController.find");
  Route.get("/payments/:id", "PaymentsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/payments", "PaymentsController.create"); //crearlos
  Route.put("/payments/:id", "PaymentsController.update"); //actualizar recibe id
  Route.delete("/payments/:id", "PaymentsController.delete"); //borrar, recibe id
}).middleware(['security']);