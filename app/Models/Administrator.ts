import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Service from './Service'
import TravelExpense from './TravelExpense'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    foreignKey:"user_id"
  })

  public user: BelongsTo<typeof User>

  @hasOne(() => Service,{
    foreignKey:"administrator_id"
  })

  public service : HasOne<typeof Service>

  @hasOne(() => TravelExpense,{
    foreignKey:"administrator_id"
  })

  public administrator: HasOne<typeof TravelExpense>
}

