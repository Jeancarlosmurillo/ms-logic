import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'
import Operation from './Operation'
import Sure from './Sure'
import VehiclesDriver from './VehiclesDriver'
import OwnerVehicle from './OwnerVehicle'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plate: string

  @column()
  public type: string

  @column()
  public capacitity_kg: string

  @column()
  public state: string

  @column()
  public transit_license:number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany (()=>Route,{
    // nombre de la clave foranea
    foreignKey:'vehicle_id'
  })

  public route: HasMany<typeof Route>

  @hasMany (()=> Sure,{
    // nombre de la clave foranea
    foreignKey:'vehicle_id'
  })

  public sure: HasMany<typeof Sure>

  @hasMany (()=>Operation,{
    // nombre de la clave foranea
    foreignKey:'vehicle_id'
  })

  public operation: HasMany<typeof Operation>

  @hasMany (()=> VehiclesDriver,{
    // nombre de la clave foranea
    foreignKey:'vehicle_id'
  })

  public vehiclesdriver: HasMany<typeof VehiclesDriver>

  //Relcion 1-N
  @hasMany (()=> OwnerVehicle,{
    // nombre de la clave foranea
    foreignKey:'vehicle_id'
  })

  public ownerVehicle: HasMany<typeof OwnerVehicle>

  
}

