import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
