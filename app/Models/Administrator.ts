import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import TravelExpense from './TravelExpense'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasOne(() => Service,{
    foreignKey:"administrator_id"
  })

  public service : HasOne<typeof Service>

  @hasOne(() => TravelExpense,{
    foreignKey:"administrator_id"
  })

  public administrator: HasOne<typeof TravelExpense>
}

