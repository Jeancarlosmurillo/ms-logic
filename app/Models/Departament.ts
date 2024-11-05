import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'

export default class Departament extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_departament: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Municipality,{ //tiene una relacion de muchos

    //este es el nombre de la clave foranea
    foreignKey: "departament_id"
  })
  public seats: HasMany<typeof Municipality>
}
