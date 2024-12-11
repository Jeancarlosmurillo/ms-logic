import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne,  } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Route from './Route'
import Lot from './Lot'
import Contract from './Contract'


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
  public contract_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Address, { 
    foreignKey:"address_id" //address_id es llave foranea de Address
  })

  public address : BelongsTo<typeof Address>

  @belongsTo(()=> Route, { 
    foreignKey:"route_id" //rout_id es llave foranea de Route
  })

  public route : BelongsTo<typeof Route>

  @belongsTo(()=> Contract, { 
    foreignKey:"contract_id" //contract_id es llave foranea de Contract
  })

  public contract : BelongsTo<typeof Contract>

  @hasOne(()=>Lot,{
    foreignKey: "order_id"
  })

  public lot: HasOne<typeof Lot>
}