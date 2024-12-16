import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import Route from "./Route";
import Order from "./Order";

export default class Lot extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public weight: number;

  @column()
  public quantity_kg: number;

  @column()
  public route_id: number | null;

  @column()
  public order_id: number | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Product, {
    foreignKey: "lot_id", //Nombre clave propagada de la entidad actual a la dominada
  })
  public products: HasMany<typeof Product>;

  @belongsTo(() => Route, {
    foreignKey: "route_id",
  })
  public route: BelongsTo<typeof Route>;

  @belongsTo(() => Order, {
    foreignKey: "order_id",
  })
  public order: BelongsTo<typeof Order>;
}
