import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'distribution_centres'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name_centre',30).notNullable()
      table.string('phone',30).notNullable()
      table.integer('municipality_id').unsigned().references('municipalities.id')
      table.integer('address_id').unsigned().references('addresses.id')
    
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
