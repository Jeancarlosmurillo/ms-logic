import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'

export default class Sure extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vehicle_id: number

  @column()
  public policy_number: string

  @column()
  public expiration_date: Date

  @column()
  public issue_date: Date

  @column()
  public value: number

  @column()
  public validity: string

  @column()
  public insurance_company: string

  @column()
  public payment_status: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Vehicle, { 
    foreignKey:"vehicle_id" //contract_id es llave foranea de Address
  })

  public vehicle : BelongsTo<typeof Vehicle>
}
