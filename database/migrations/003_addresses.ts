import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('street',30).notNullable()
      table.string('neighborhood',30).notNullable()
      table.string('door_number',30).notNullable()
      table.string('municipality_name',30).notNullable()
      table.integer('municipality_id').unsigned().references('municipalities.id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
