import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/distributioncentres", "DistributionCentresController.find");
    Route.get("/distributioncentres/:id", "DistributionCentresController.find");
    Route.post("/distributioncentres", "DistributionCentresController.create");
    Route.put("/distributioncentres/:id", "DistributionCentresController.update");
    Route.delete("/distributioncentres/:id", "DistributionCentresController.delete");
})//.middleware("security");