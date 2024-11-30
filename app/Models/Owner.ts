import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import OwnerVehicle from './OwnerVehicle'
import Spent from './Spent'

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relacionde 1-N
  @hasMany (()=> OwnerVehicle,{
    // nombre de la clave foranea
    foreignKey:'owner_id'
  })

  public ownerVehicle: HasMany<typeof OwnerVehicle>

  @hasMany (()=> Spent,{
    // nombre de la clave foranea
    foreignKey:'owner_id'
  })

  public spent: HasMany<typeof Spent>
}
