import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'routes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('route_start')
      table.string('route_end')
      table.dateTime('start_date')
      table.dateTime('end_date')
      table.string('state')
      table.integer('contract_id').unsigned().references("contracts.id").onDelete("CASCADE")
      table.integer('vehicle_id').unsigned().references("vehicles.id").onDelete("CASCADE")

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
