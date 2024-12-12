import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Bill from "./Bill";
import Contract from "./Contract";

export default class Quota extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public payment_date: DateTime;

  @column()
  public contract_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Bill, {
    foreignKey: "quota_id",
  })
  public bill: HasOne<typeof Bill>;

  @belongsTo(() => Contract, {
    foreignKey: "contract_id",
  })
  public contract: BelongsTo<typeof Contract>;
}
