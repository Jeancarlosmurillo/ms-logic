import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/customer", "CustomersController.find"); //lisar solo uno
  Route.get("/customer/:id", "CustomersController.find"); //pedir customers con id.
  Route.post("/customers", "CustomersController.create"); //crearlos
  Route.put("/customers/:id", "CustomersController.update"); //actualizar recibe id
  Route.delete("/customers/:id", "CustomersController.delete"); //borrar, recibe id
}); //.middleware(['security']);
