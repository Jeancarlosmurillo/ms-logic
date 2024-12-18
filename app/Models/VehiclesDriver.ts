import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Driver from './Driver'
import Tranch from './Tranch'

export default class VehiclesDriver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public assignment_date:Date

  @column()
  public vehicle_id:number

  @column()
  public driver_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Vehicle, { 
    foreignKey:"vehicle_id" 
  })

  public vehicle : BelongsTo<typeof Vehicle>

  @belongsTo(()=> Driver, { 
    foreignKey:"driver_id" 
  })

  public driver: BelongsTo<typeof Driver>

  @hasOne(()=> Tranch,{
    foreignKey: 'vehicle_driver_id'
  })
  public tranch: HasOne<typeof Tranch>

}


