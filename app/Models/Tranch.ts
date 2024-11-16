import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import DistributionCentre from './DistributionCentre'
import Route from './Route'
import VehiclesDriver from './VehiclesDriver'
import Service from './Service'

export default class Tranch extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public origin: number

  @column()
  public destination: number

  @column()
  public route_id: number

  @column()
  public vehicle_driver_id : number

  @column()
  public start_date: Date

  @column()
  public end_date: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> DistributionCentre, { 
    foreignKey:"origin" //origin es llave foranea de Address
  })
  
  public distribution_centre_origin : BelongsTo<typeof DistributionCentre>

  @belongsTo(()=> DistributionCentre, { 
    foreignKey:"destination" //destination es llave foranea de Address
  })
  public distribution_centre_destination : BelongsTo<typeof DistributionCentre>

  @belongsTo(()=> VehiclesDriver, { 
    foreignKey:"vehicle_driver_id" //rout_id es llave foranea de Route
  })
  
  public vehicle_driver: BelongsTo<typeof VehiclesDriver>

  @belongsTo(()=> Route, { 
    foreignKey:"route_id" //rout_id es llave foranea de Route
  })
  
  public route : BelongsTo<typeof Route>

  @hasOne(()=> Service,{
    foreignKey:"tranch_id"
  })

  public service: HasOne<typeof Service>    
}
