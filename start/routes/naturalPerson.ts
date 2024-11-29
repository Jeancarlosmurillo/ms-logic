import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/naturalPeoples", "NaturalPeoplesController.find");
    Route.get("/naturalPeoples/:id", "NaturalPeoplesController.find");
    Route.post("/naturalPeoples", "NaturalPeoplesController.create");
    Route.put("/naturalPeoples/:id", "NaturalPeoplesController.update");
    Route.delete("/naturalPeoples/:id", "NaturalPeoplesController.delete");
})//.middleware(['security']);
