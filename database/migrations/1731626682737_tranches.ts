import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tranches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date("start_date")
      table.date("end_date")
      table.integer("origin").unsigned().references("distribution_centres.id")
      table.integer("destination").unsigned().references("distribution_centres.id")
      table.integer("route_id").unsigned().references("routes.id")
      table.integer("vehicle_driver_id").unsigned().references("vehicles_drivers.id").onDelete("CASCADE")

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
