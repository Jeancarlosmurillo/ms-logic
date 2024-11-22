import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'travel_expenses'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('administrator_id').unsigned().references('administrators.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('administrator_id')
    })
  }
}
