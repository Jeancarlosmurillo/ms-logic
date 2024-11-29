import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'spents'

  public async up () {
    // Verificar si la tabla 'spents' ya existe antes de crearla
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.integer('travel_expense_id').unsigned().references("travel_expenses.id")
        table.integer('driver_id').unsigned().references("drivers.id")
        table.integer('owner_id').unsigned().references("owners.id")
        table.integer('service_id').unsigned().references("services.id")

        /**
         * Usa timestamptz para PostgreSQL y DATETIME2 para MSSQL
         */
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
      })
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

