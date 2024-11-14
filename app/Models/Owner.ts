import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import OwnerVehicle from './OwnerVehicle'

export default class Owner extends BaseModel {
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

  // Relacionde 1-N
  @hasMany (()=> OwnerVehicle,{
    // nombre de la clave foranea
    foreignKey:'owner_id'
  })

  public ownerVehicle: HasMany<typeof OwnerVehicle>
}
