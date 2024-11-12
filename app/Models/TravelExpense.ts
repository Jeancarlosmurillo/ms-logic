import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Restaurant from './Restaurant'
import Hotel from './Hotel'

export default class TravelExpense extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public restaurant_id: number

  @column()
  public hotel_id: number

  @column()
  public amount_restaurant: number

  @column()
  public amount_hotel: number

  @column()
  public date_service_restaurant: Date

  @column()
  public date_service_hotel: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Restaurant,{
    foreignKey:"restaurant_id"
  })

  public restaurant: BelongsTo<typeof Restaurant>

  @belongsTo(() => Hotel,{
    foreignKey:"hotel_id"
  })

  public hotel: BelongsTo<typeof Hotel>


}
