import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Payment from './Payment'

export default class Bill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date_bill: DateTime

  @column()
  public total_amount: number

  @column()
  public state: string

  @column()
  public quotas: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => Payment, {
    foreignKey: "payment_id",
  })
  public payment: BelongsTo<typeof Payment>;
}
