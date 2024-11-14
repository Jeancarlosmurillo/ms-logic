import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/shifts", "ShiftsController.find"); //lisar solo uno
  Route.get("/shifts/:id", "ShiftsController.find"); //pedir shiftss con id. 
  Route.post("/shifts", "ShiftsController.create"); //crearlos
  Route.put("/shifts/:id", "ShiftsController.update"); //actualizar recibe id
  Route.delete("/shifts/:id", "ShiftsController.delete"); //borrar, recibe id
});