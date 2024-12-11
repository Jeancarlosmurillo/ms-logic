import { DateTime } from 'luxon'
import { BaseModel,column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import NaturalPerson from './NaturalPerson'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_company: string

  @column()
  public phone_company:number

  @column()
  public customer_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => NaturalPerson,{
    foreignKey:"company_id"
  })

  public naturalperson: HasOne<typeof NaturalPerson>

  @hasOne (() => Company,{
    foreignKey:"company_id"
  })

  public company: HasOne<typeof Company>
}
