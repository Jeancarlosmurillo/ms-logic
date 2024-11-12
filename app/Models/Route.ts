import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Vehicle from './Vehicle'
import Lot from './Lot'

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public route_start: string

  @column()
  public route_end: string

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column()
  public state: string

  @column()
  public contract_id: number  

  @column()
  public vehicle_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Contract, { 
    foreignKey:"contract_id" //contract_id es llave foranea de Contract
  })

  public contract : BelongsTo<typeof Contract>

  @belongsTo(()=> Vehicle, { 
    foreignKey:"vehicle_id" 
  })

  public vehicle : BelongsTo<typeof Vehicle>

  @belongsTo(()=> Lot, { 
    foreignKey:"lot_id" 
  })
  public lot : BelongsTo<typeof Lot>

 /* @belongsTo(()=> Order, { 
    foreignKey:"order_id" 
  })
  public order : BelongsTo<typeof Order> */


}
