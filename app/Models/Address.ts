import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import DistributionCentre from './DistributionCentre'
import Municipality from './Municipality'

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
  public municipality_id: number //FK

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(()=>DistributionCentre,{
    foreignKey: 'address_id'
  })
  public centre: HasOne<typeof DistributionCentre>

  @belongsTo(()=> Municipality,{
    //Este es el nombre de la clave foranea 
    foreignKey: 'municipality_id'
  })
  public municipality :BelongsTo<typeof Municipality>
}
