import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoryProduct from './CategoryProduct'
import Lot from './Lot'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public cuantity: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => CategoryProduct, {
    foreignKey: "product_id", //cual es la clave foranea que permite esa relacion
  })
  public categoryProduct: HasMany<typeof CategoryProduct>;

  @belongsTo(() => Lot, {
    foreignKey: "lot_id",
  })
  public lot: BelongsTo<typeof Lot>;

}
