import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/services", "ServicesController.find"); //lisar solo uno
  Route.get("/services/:id", "ServicesController.find"); //pedir servicess con id. 
  Route.post("/services", "ServicesController.create"); //crearlos
  Route.put("/services/:id", "ServicesController.update"); //actualizar recibe id
  Route.delete("/services/:id", "ServicesController.delete"); //borrar, recibe id
}).middleware(['security']);