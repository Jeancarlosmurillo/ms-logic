import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DistributionCentre extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_centre: string

  @column()
  public phone: string

  @column()
  public municipality_id: number //FK

  @column()
  public address_id: number //FK

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
