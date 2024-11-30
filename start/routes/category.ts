import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/categories", "CategoriesController.find");
  Route.get("/categories/:id", "CategoriesController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/categories", "CategoriesController.create"); //crearlos
  Route.put("/categories/:id", "CategoriesController.update"); //actualizar recibe id
  Route.delete("/categories/:id", "CategoriesController.delete"); //borrar, recibe id
})//.middleware(['security']);