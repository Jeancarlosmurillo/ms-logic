import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Departament from './Departament'
import Address from './Address'
import Operation from './Operation'


export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name_municipality: string

  @column()
  public departament_id: number //FK

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Departament,{
    //Este es el nombre de la clave foranea 
    foreignKey: 'departament_id'
  })
  public departament :BelongsTo<typeof Departament>

  @hasMany(()=>Address,{ //tiene una relacion de muchos

    //este es el nombre de la clave foranea
    foreignKey: "municipality_id"
  })
  public address: HasMany<typeof Address>

  @hasMany(()=>Operation,{ //tiene una relacion de muchos

    //este es el nombre de la clave foranea
    foreignKey: "municipality_id"
  })
  public operation: HasMany<typeof Operation>
}




  
 


