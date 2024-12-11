import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/travelExpenses", "TravelExpensesController.find");
    Route.get("/travelExpenses/:id", "TravelExpensesController.find");
    Route.post("/travelExpenses", "TravelExpensesController.create");
    Route.put("/travelExpenses/:id", "TravelExpensesController.update");
    Route.delete("/travelExpenses/:id", "TravelExpensesController.delete");
})//.middleware("security")