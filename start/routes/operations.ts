import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operations", "operationsController.find");
    Route.get("/operations/:id", "operationsController.find");
    Route.post("/operations", "operationsController.create");
    Route.put("/operations/:id", "operationsController.update");
    Route.delete("/operations/:id", "operationsController.delete");
}).middleware("security")