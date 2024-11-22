import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import RestaurantPlate from './RestaurantPlate'

export default class Plate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public description:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relacion 1-N
  @hasMany (()=>RestaurantPlate,{
    // nombre de la clave foranea
    foreignKey:'plate_id'
  })
  public plate: HasMany<typeof RestaurantPlate>
}
