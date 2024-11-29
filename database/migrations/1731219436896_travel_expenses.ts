import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'travel_expenses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("restaurant_id").unsigned().references("restaurants.id")
      table.integer("hotel_id").unsigned().references("hotels.id")
      table.float("amount_restaurant")
      table.float("amount_hotel")
      table.date("date_service_restaurant")
      table.date("date_service_hotel")
      table.integer('administrator_id').unsigned().references("administrators.id").onDelete("CASCADE")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
