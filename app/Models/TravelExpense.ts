import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Restaurant from './Restaurant'
import Hotel from './Hotel'
import Spent from './Spent'
import Administrator from './Administrator'

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

  @column()
  public administrator_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Restaurant,{
    foreignKey:"restaurant_id"
  })

  public restaurant: BelongsTo<typeof Restaurant>

  @belongsTo(()=> Administrator, { 
    foreignKey:"administrator_id" //administrator_id es llave foranea de administrador
  })

  public administrator : BelongsTo<typeof Administrator>

  @belongsTo(() => Hotel,{
    foreignKey:"hotel_id"
  })

  public hotel: BelongsTo<typeof Hotel>

  @hasMany (()=>Spent,{
    // nombre de la clave foranea
    foreignKey:'travel_expense_id'
  })
  public spent: HasMany<typeof Spent>


}
