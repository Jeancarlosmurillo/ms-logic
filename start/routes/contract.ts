import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/contracts", "ContractsController.find"); //lisar solo uno
  Route.get("/contracts/:id", "ContractsController.find"); //pedir contracts con id. 
  Route.post("/contracts", "ContractsController.create"); //crearlos
  Route.put("/contracts/:id", "ContractsController.update"); //actualizar recibe id
  Route.delete("/contracts/:id", "ContractsController.delete"); //borrar, recibe id
});