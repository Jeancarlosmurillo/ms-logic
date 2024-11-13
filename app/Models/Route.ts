import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Vehicle from './Vehicle'

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
    foreignKey:"vehicle_id" //vehicle_id es llave foranea de Contract
  })

  public vehicle : BelongsTo<typeof Vehicle>

  @hasMany (()=> Route,{
    // nombre de la clave foranea
    foreignKey:'address_id'
  })

  public route: HasMany<typeof Route>

  
}
