import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import TravelExpense from './TravelExpense'
import Driver from './Driver'
import Owner from './Owner'

export default class Spent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id: number //FK

  @column()
  public owner_id: number //FK

  @column()
  public travel_expense_id: number //FK

  @column()
  public driver_id: number //FK

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  @belongsTo(()=> TravelExpense, { 
    foreignKey:"travel_expense_id" //contract_id es llave foranea de Contract
  })

  public travel_expense : BelongsTo<typeof TravelExpense>

  @belongsTo(()=> Driver, { 
    foreignKey:"driver_id" 
  })

  public driver : BelongsTo<typeof Driver>

  @belongsTo(() => Owner,{
    foreignKey:"owner_id"
  })

  public owner: BelongsTo<typeof Owner>
}
