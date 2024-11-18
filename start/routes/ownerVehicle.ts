import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/ownerVehicles", "ownerVehiclesController.find"); //lisar solo uno
  Route.get("/ownerVehicles/:id", "ownerVehiclesController.find"); //pedir ownerVehiclesss con id. 
  Route.post("/ownerVehicles", "ownerVehiclesController.create"); //crearlos
  Route.put("/ownerVehicles/:id", "ownerVehiclesController.update"); //actualizar recibe id
  Route.delete("/ownerVehicles/:id", "ownerVehiclesController.delete"); //borrar, recibe id
}).middleware(['security']);