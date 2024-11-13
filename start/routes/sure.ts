import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/sures", "SuresController.find"); //lisar solo uno
  Route.get("/sures/:id", "SuresController.find"); //pedir suress con id. 
  Route.post("/sures", "SuresController.create"); //crearlos
  Route.put("/sures/:id", "SuresController.update"); //actualizar recibe id
  Route.delete("/sures/:id", "SuresController.delete"); //borrar, recibe id
});