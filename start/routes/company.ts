import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/companies", "CompaniesController.find");
  Route.get("/companies/:id", "CompaniesController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/companies", "CompaniesController.create"); //crearlos
  Route.put("/companies/:id", "CompaniesController.update"); //actualizar recibe id
  Route.delete("/companies/:id", "CompaniesController.delete"); //borrar, recibe id
});