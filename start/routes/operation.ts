import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/operations", "OperationsController.find");
  Route.get("/operations/:id", "OperationsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/operations", "OperationsController.create"); //crearlos
  Route.put("/operations/:id", "OperationsController.update"); //actualizar recibe id
  Route.delete("/operations/:id", "OperationsController.delete"); //borrar, recibe id
});