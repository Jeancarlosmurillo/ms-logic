import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/tranches", "TranchesController.find"); //lisar solo uno
  Route.get("/tranches/:id", "TranchesController.find"); //pedir tranchess con id. 
  Route.post("/tranches", "TranchesController.create"); //crearlos
  Route.put("/tranches/:id", "TranchesController.update"); //actualizar recibe id
  Route.delete("/tranches/:id", "TranchesController.delete"); //borrar, recibe id
})//.middleware(['security']);