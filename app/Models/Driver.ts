import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Shift from './Shift'
import VehiclesDriver from './VehiclesDriver'
import Spent from './Spent'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public license:number

  @column()
  public license_type:string

  @column()
  public user_id:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Shift,{
    foreignKey:"driver_id"
  })

  public shift: HasMany<typeof Shift>

  @hasMany(() => VehiclesDriver,{
    foreignKey:"driver_id"
  })

  public vehiclesDriver: HasMany<typeof VehiclesDriver>

  @hasMany (()=>Spent,{
    // nombre de la clave foranea
    foreignKey:'driver_id'
  })
  public spent: HasMany<typeof Spent>

}
