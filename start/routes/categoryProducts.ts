import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/categoryProducts", "CategoryProductsController.find");
  Route.get("/categoryProducts/:id", "CategoryProductsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/categoryProducts", "CategoryProductsController.create"); //crearlos
  Route.put("/categoryProducts/:id", "CategoryProductsController.update"); //actualizar recibe id
  Route.delete("/categoryProducts/:id", "CategoryProductsController.delete"); //borrar, recibe id
});