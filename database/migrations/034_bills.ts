import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "bills";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.dateTime("date_bill");
      table.integer("total_amount");
      table.string("state");
      table.integer("quotas");
      // table.integer("payment_id").nullable().references("payments.id");
      // table.integer("spent_id").nullable().references("spents.id");
      table
        .integer("quota_id")
        .unsigned()
        .references("quotas.id")
        .onDelete("CASCADE");
      table
        .integer("spent_id")
        .unsigned()
        .references("spents.id")
        .onDelete("CASCADE");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

// necesito saber cuanta plata ha pagado el dueño del carro que mas veces se ha equivocado iniciando sesion
