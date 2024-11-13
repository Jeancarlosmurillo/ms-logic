import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import TravelExpense from './TravelExpense'

export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => TravelExpense,{
    foreignKey:"restaurant_id"
  })

  public travel_expenses: HasOne<typeof TravelExpense>
}