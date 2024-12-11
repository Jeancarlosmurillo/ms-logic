import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import TravelExpense from './TravelExpense'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public service_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasOne(() => TravelExpense,{
    foreignKey:"administrator_id"
  })

  public administrator: HasOne<typeof TravelExpense>

  @belongsTo(()=> Service, { 
    foreignKey:"service_id" //administrator_id es llave foranea de administrador
  })

  public servicio: BelongsTo<typeof Service>
}

