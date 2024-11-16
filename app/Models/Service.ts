import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Administrator from './Administrator'

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
  public tranches_id:number

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

  /*@belongsTo(()=> Tranches, { 
    foreignKey:"tranches_id" //traches_id es llave foranea de Traches
  })

  public tranches: BelongsTo<typeof Tranches>*/
}
