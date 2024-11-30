import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'

export default class NaturalPerson extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public user_id:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Company,{
    foreignKey:"person_id"
  })

  public company: HasOne<typeof Company>

  @hasOne (() => NaturalPerson,{
    foreignKey:"person_id"
  })

  public naturalperson: HasOne<typeof NaturalPerson>
}
