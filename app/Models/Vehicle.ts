import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plate: string

  @column()
  public type: string

  @column()
  public capacitity: string

  @column()
  public state: string

  @column()
  public current_location: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany (()=>Route,{
    // nombre de la clave foranea
    foreignKey:'vehicle_id'
  })

  public route: HasMany<typeof Route>
}
