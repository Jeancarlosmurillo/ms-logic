import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/municipalities", "MunicipalitiesController.find");
    Route.get("/municipalities/:id", "MunicipalitiesController.find");
    Route.post("/municipalities", "MunicipalitiesController.create");
    Route.put("/municipalities/:id", "MunicipalitiesController.update");
    Route.delete("/municipalities/:id", "MunicipalitiesController.delete");
})