import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/bills", "BillsController.find");
  Route.get("/bills/:id", "BillsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/bills", "BillsController.create"); //crearlos
  Route.put("/bills/:id", "BillsController.update"); //actualizar recibe id
  Route.delete("/bills/:id", "BillsController.delete"); //borrar, recibe id
}).middleware(['security']);