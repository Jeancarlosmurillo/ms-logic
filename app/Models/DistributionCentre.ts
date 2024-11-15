import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import Address from './Address'
import Tranch from './Tranch'

export default class DistributionCentre extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_centre: string

  @column()
  public phone: string

  @column()
  public municipality_id: number //FK

  @column()
  public address_id: number //FK

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Municipality,{
    //Este es el nombre de la clave foranea 
    foreignKey: 'municipality_id'
  })
  public municipality :BelongsTo<typeof Municipality>

  @belongsTo(()=> Address,{
    //Este es el nombre de la clave foranea 
    foreignKey: 'address_id'
  })
  public addres :BelongsTo<typeof Address>

  @hasMany (()=>Tranch,{
    // nombre de la clave foranea
    foreignKey:'origin',
  })

  public tranch_start: HasMany<typeof Tranch>

  @hasMany (()=>Tranch,{
    // nombre de la clave foranea
    foreignKey:'destination'
  })

  public tranch_end: HasMany<typeof Tranch>
}
