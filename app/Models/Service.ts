import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Tranch from './Tranch'
import Spent from './Spent'
import Administrator from './Administrator'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount:number

  @column()
  public date_service:Date

  @column()
  public contract_id:number

  @column()
  public tranch_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Contract, { 
    foreignKey:"contract_id" //contract_id es llave foranea de Contract
  })

  public contract : BelongsTo<typeof Contract>  

  @belongsTo(()=> Tranch, { 
    foreignKey:"tranch_id" //traches_id es llave foranea de Traches
  })

  public tranch: BelongsTo<typeof Tranch>

  //Relacion de 1-N
  @hasMany(()=> Spent,{
    foreignKey:'service_id'
  })

  public spent: HasMany<typeof Spent>

  @hasOne(() => Administrator, {
    foreignKey: "service_id",
  })
  public administrator: HasOne<typeof Administrator>;
}
