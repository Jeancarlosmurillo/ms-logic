import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public date:DateTime

  @column()
  public customer_id: number

  @column()
  public order_id: number

  @column()
  public stretch_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany (()=> Route,{
    // nombre de la clave foranea
    foreignKey:'contract_id'
  })

  public route: HasMany<typeof Route>
}
