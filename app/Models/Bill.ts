import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Quota from "./Quota";
import Spent from "./Spent";

export default class Bill extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public date_bill: DateTime;

  @column()
  public total_amount: number;

  @column()
  public state: string;

  @column()
  public quotas: number;

  @column()
  public payment_id: number | null;
  @column()
  public spent_id: number | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Quota, {
    foreignKey: "quota_id",
  })
  public quota: BelongsTo<typeof Quota>;

  @belongsTo(() => Spent, {
    //nombre de la clave foranea que permite la relacion bidireccional 1:1  en este caso viene de quota
    foreignKey: "spent_id",
  })
  public spent: BelongsTo<typeof Spent>;
}
