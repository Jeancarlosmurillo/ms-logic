import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Owner from './Owner'

export default class OwnerVehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public owner_id:number

  @column()
  public vehicle_id:number

  @column()
  public assignment_date:Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relacion 1-N
  @belongsTo(()=> Vehicle, { 
    foreignKey:"vehicle_id" 
  })

  public vehicle : BelongsTo<typeof Vehicle>

  // Realcion 1-N
  @belongsTo(()=> Owner, { 
    foreignKey:"owner_id" 
  })

  public owner : BelongsTo<typeof Owner>
}
