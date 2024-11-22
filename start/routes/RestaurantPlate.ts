import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/restaurantPlates", "RestaurantPlatesController.find");
    Route.get("/restaurantPlates/:id", "RestaurantPlatesController.find");
    Route.post("/restaurantPlates", "RestaurantPlatesController.create");
    Route.put("/restaurantPlates/:id", "RestaurantPlatesController.update");
    Route.delete("/restaurantPlates/:id", "restaurantPlatesController.delete");
})