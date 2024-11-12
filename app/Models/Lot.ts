import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Route from './Route'

export default class Lot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public weight: number

  @column()
  public quantity_kg: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product,{
    foreignKey: 'lot_id' //Nombre clave propagada de la entidad actual a la dominada
  })
  public products: HasMany<typeof Product>

  @hasOne(()=> Route,{
    foreignKey: 'lot_id'
  })
  public route: HasOne<typeof Route>

 /* @hasOne(()=> Order,{
    foreignKey: 'lot_id'
  })
  public order: HasOne<typeof Order> */

}




