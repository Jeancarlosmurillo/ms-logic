import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Contract from './Contract'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public user_id: string

 //Relacion de 1 a N
 @hasMany(() => Product, {
  foreignKey: "customer_id", //Clave foránea que relaciona la identidad dominada
})
public product: HasMany<typeof Product>;

//Relacion de 1 a N
@hasMany(() => Contract, {
  foreignKey: "customer_id", //Clave foránea que relaciona la identidad dominada
})
public contract: HasMany<typeof Contract>;


}
