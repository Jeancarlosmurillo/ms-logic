import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Plate from './Plate'
import Restaurant from './Restaurant'

export default class RestaurantPlate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public price: number

  @column()
  public plate_id:number

  @column()
  public restaurant_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Plate, { 
    foreignKey:"plate_id" //contract_id es llave foranea de Contract
  })

  public plate: BelongsTo<typeof Plate>

  @belongsTo(()=> Restaurant, { 
    foreignKey:"restaurant_id" //contract_id es llave foranea de Contract
  })

  public  restaurant: BelongsTo<typeof Restaurant>

}
