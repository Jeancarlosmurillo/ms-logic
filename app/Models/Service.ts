import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Administrator from './Administrator'
import Tranch from './Tranch'
import Spent from './Spent'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount:number

  @column()
  public date_service:Date

  @column()
  public administrator_id:number

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

  @belongsTo(()=> Administrator, { 
    foreignKey:"administrator_id" //administrator_id es llave foranea de administrador
  })

  public administrator : BelongsTo<typeof Administrator>

  @belongsTo(()=> Tranch, { 
    foreignKey:"tranch_id" //traches_id es llave foranea de Traches
  })

  public tranch: BelongsTo<typeof Tranch>

  //Relacion de 1-N
  @hasMany(()=> Spent,{
    foreignKey:'service_id'
  })

  public spent: HasMany<typeof Spent>
}
