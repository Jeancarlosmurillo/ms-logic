import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/plates", "PlatesController.find");
    Route.get("/plates/:id", "PlatesController.find");
    Route.post("/plates", "PlatesController.create");
    Route.put("/plates/:id", "PlatesController.update");
    Route.delete("/plates/:id", "PlatesController.delete");
})