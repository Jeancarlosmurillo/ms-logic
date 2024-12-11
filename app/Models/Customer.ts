import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Contract from './Contract'
import Company from './Company'
import NaturalPerson from './NaturalPerson'


export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public phone_number: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


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

@hasOne(() => NaturalPerson, {
  foreignKey: "customer_id", //Clave foránea que relaciona la identidad dominada
})
public naturalperson: HasOne<typeof NaturalPerson>;

@hasOne(() => Company, {
  foreignKey: "customer_id", //Clave foránea que relaciona la identidad dominada
})
public companies: HasOne<typeof Company>;

}