import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/owners", "OwnersController.find"); //lisar solo uno
  Route.get("/owners/:id", "OwnersController.find"); //pedir ownersss con id. 
  Route.post("/owners", "OwnersController.create"); //crearlos
  Route.put("/owners/:id", "OwnersController.update"); //actualizar recibe id
  Route.delete("/owners/:id", "OwnersController.delete"); //borrar, recibe id
});