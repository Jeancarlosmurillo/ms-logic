import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Administrator from './Administrator'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public rol: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Administrator,{
    foreignKey:"user_id"
  })

  public administrator: HasOne<typeof Administrator>


}