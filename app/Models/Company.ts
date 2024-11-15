import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public representative: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Customer, {
    foreignKey: "company_id", //Clave foránea que relaciona la identidad dominada
  })
  public customer: HasOne<typeof Customer>;
}
