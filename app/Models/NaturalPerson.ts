import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Company from './Company'

export default class NaturalPerson extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public user_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    foreignKey:"user_id"
  })

  public user: BelongsTo<typeof User>

  @hasOne(() => Company,{
    foreignKey:"person_id"
  })

  public company: HasOne<typeof Company>

  @hasOne (() => NaturalPerson,{
    foreignKey:"person_id"
  })

  public naturalperson: HasOne<typeof NaturalPerson>
}
