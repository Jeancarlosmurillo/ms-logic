import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Vehicle from './Vehicle'
import Lot from './Lot'
import Address from './Address'

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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

  @hasMany(()=> Lot, { 
    foreignKey:"route_id" 
  })
  public lot : HasMany<typeof Lot>

 /* @belongsTo(()=> Order, { 
    foreignKey:"order_id" 
  })
  public order : BelongsTo<typeof Order> */



  @hasMany (()=> Address,{
    // nombre de la clave foranea
    foreignKey:'address_id'
  })

  public address: HasMany<typeof Address>

  
}
