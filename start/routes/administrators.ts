import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/administrators", "AministratorsController.find");
  Route.get("/administrators/:id", "AministratorsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/administrators", "AministratorsController.create"); //crearlos
  Route.put("/administrators/:id", "AministratorsController.update"); //actualizar recibe id
  Route.delete("/administrators/:id", "AministratorsController.delete"); //borrar, recibe id
});