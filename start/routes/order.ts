import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/orders", "OrdersController.find"); //lisar solo uno
  Route.get("/orders/:id", "OrdersController.find"); //pedir orderss con id. 
  Route.post("/orders", "OrdersController.create"); //crearlos
  Route.put("/orders/:id", "OrdersController.update"); //actualizar recibe id
  Route.delete("/orders/:id", "OrdersController.delete"); //borrar, recibe id
});