import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/departaments", "DepartamentsController.find");
    Route.get("/departaments/:id", "DepartamentsController.find");
    Route.post("/departaments", "DepartamentsController.create");
    Route.put("/departaments/:id", "DepartamentsController.update");
    Route.delete("/departaments/:id", "DepartamentsController.delete");
})//.middleware("security")