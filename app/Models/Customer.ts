import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import Company from "./Company";
import NaturalPerson from "./NaturalPerson";
import Contract from "./Contract";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public phone_number: number;
  @column()
  public naturalPerson_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //Relacion de 1 a N
  @hasMany(() => Product, {
    foreignKey: "customer_id", //Clave foránea que relaciona la identidad dominada
  })
  public batches: HasMany<typeof Product>;

  //Relacion de 1 a N
  @hasMany(() => Contract, {
    foreignKey: "customer_id", //Clave foránea que relaciona la identidad dominada
  })
  public contract: HasMany<typeof Contract>;

  //Relacion de 1 a 1
  @hasOne(() => Company, {
    foreignKey: "customer_id", //Clave foránea que relaciona la identidad dominada
  })
  public companies: HasOne<typeof Company>;

  //Relacion de 1 a 1
  @hasOne(() => NaturalPerson, {
    foreignKey: "customer_id", //Clave foránea que relaciona la identidad dominada
  })
  public naturalPerson: HasOne<typeof NaturalPerson>;
}
