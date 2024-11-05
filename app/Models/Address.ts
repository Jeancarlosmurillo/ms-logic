import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import DistributionCentre from './DistributionCentre'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public neighborhood: string

  @column()
  public street: string
  
  @column()
  public door_number: string

  @column()
  public municipality_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(()=>DistributionCentre,{
    foreignKey: 'address_id'
  })
  public centre: HasOne<typeof DistributionCentre>
}
