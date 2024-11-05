import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Departament from './Departament'
import Address from './Address'


export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name_municipality: string

  @column()
  public departament_id: number //pongo el atributo de la clave foranea

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
  public seats: HasMany<typeof Address>
}




  
 


