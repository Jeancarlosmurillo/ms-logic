import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up () {
    if (!(await this.schema.hasTable(this.tableName))) {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name_company')
      table.integer('phone_company')
      table.integer('customer_id').unsigned().references('customers')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
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
