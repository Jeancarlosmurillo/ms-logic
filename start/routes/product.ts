import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/products", "ProductsController.find");
  Route.get("/products/:id", "ProductsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/products", "ProductsController.create"); //crearlos
  Route.put("/products/:id", "ProductsController.update"); //actualizar recibe id
  Route.delete("/products/:id", "ProductsController.delete"); //borrar, recibe id
})//.middleware(['security']);