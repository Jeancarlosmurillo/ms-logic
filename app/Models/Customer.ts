import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Contract from './Contract'
import Company from './Company'
import NaturalPerson from './NaturalPerson'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_id: number

  @column()
  public person_id: number

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

@belongsTo(() => Company, {
  foreignKey: "company_id", //Clave foránea que relaciona la identidad dominada
})
public companies: BelongsTo<typeof Company>;

//Relacion de 1 a 1 
@belongsTo(() => NaturalPerson, {
  foreignKey: "person_id", //Clave foránea que relaciona la identidad dominada
})
public NaturalPerson: BelongsTo<typeof NaturalPerson>;

}
