import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Shift from './Shift'
import VehiclesDriver from './VehiclesDriver'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public license:number

  @column()
  public license_type:string

  @column()
  public user_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    foreignKey:"user_id"
  })

  public user: BelongsTo<typeof User>

  @hasMany(() => Shift,{
    foreignKey:"driver_id"
  })

  public shift: HasMany<typeof Shift>

  @hasMany(() => VehiclesDriver,{
    foreignKey:"driver_id"
  })

  public vehiclesDriver: HasMany<typeof VehiclesDriver>

}
