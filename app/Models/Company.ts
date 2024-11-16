import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import NaturalPerson from './NaturalPerson'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_company: string

  @column()
  public phone_company:number

  @column()
  public person_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => NaturalPerson,{
    foreignKey:"person_id"
  })

  public naturalperson: BelongsTo<typeof NaturalPerson>

  @hasOne (() => Company,{
    foreignKey:"company_id"
  })

  public company: HasOne<typeof Company>
}
