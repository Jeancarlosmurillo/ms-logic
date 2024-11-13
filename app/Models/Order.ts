import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Route from './Route'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type:string

  @column()
  public date_order:Date

  @column()
  public address_id:number

  @column()
  public route_id:number

  @column()
  public lot_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Address, { 
    foreignKey:"address_id" //contract_id es llave foranea de Address
  })

  public address : BelongsTo<typeof Address>

  @belongsTo(()=> Route, { 
    foreignKey:"route_id" //contract_id es llave foranea de Route
  })

  public route : BelongsTo<typeof Route>
}
