import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'
import Payment from './Payment'
import Customer from './Customer'
import Order from './Order'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany (()=> Route,{
    // nombre de la clave foranea
    foreignKey:'contract_id'
  })

  public route: HasMany<typeof Route>

  @hasMany (()=> Payment,{
    // nombre de la clave foranea
    foreignKey:'payment_id'
  })

  public payment: HasMany<typeof Payment>

  @belongsTo(()=> Customer, { 
    foreignKey:"customer_id" //contract_id es llave foranea de Contract
  })

  public customer : BelongsTo<typeof Customer>

  //Relacion de 1 a N
  @hasMany(()=> Order, { 
    foreignKey:"contract_id" //id es llave foranea de Contract
  })

  public order : HasMany<typeof Order>

}
