import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/naturalPeoples", "NaturalPeopleController.find");
    Route.get("/naturalPeoples/:id", "NaturalPeopleController.find");
    Route.post("/naturalPeoples", "NaturalPeopleController.create");
    Route.put("/naturalPeoples/:id", "NaturalPeopleController.update");
    Route.delete("/naturalPeoples/:id", "NaturalPeopleController.delete");
})