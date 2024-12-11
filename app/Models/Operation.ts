import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import Vehicle from './Vehicle'

export default class Operation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public municipality_id: number //FK

  @column()
  public vehicle_id: number //FK

  
  @column()
  public municipality_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Municipality,{
    //Este es el nombre de la clave foranea 
    foreignKey: 'municipality_id'
  })
  public municipality :BelongsTo<typeof Municipality>

  @belongsTo(()=> Vehicle,{
    //Este es el nombre de la clave foranea 
    foreignKey: 'vehicle_id'
  })
  public vehicle :BelongsTo<typeof Vehicle>

}

