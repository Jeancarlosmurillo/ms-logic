import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoryProduct from './CategoryProduct'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string 

  @column()
  public category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category, {
    foreignKey: "category_id",
  })
  public category: BelongsTo<typeof Category>;

  @hasMany(() => CategoryProduct, {
    foreignKey: "category_id", //cual es la clave foranea que permite esa relacion
  })
  public categoryProduct: HasMany<typeof CategoryProduct>;
}
