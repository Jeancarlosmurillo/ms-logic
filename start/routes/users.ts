import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/users", "UsersController.find");
  Route.get("/users/:id", "UsersController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/users", "UsersController.create"); //crearlos
  Route.put("/users/:id", "UsersController.update"); //actualizar recibe id
  Route.delete("/users/:id", "UsersController.delete"); //borrar, recibe id
});