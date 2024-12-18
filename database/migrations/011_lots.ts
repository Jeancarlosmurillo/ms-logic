import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "lots";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("weight");
      table.integer("quantity_kg");

      table.integer("route_id").nullable();
      table.integer("order_id").nullable();

      // table.integer('route_id').unsigned().references("routes.id").onDelete("CASCADE")
      // table.integer('order_id').unsigned().references("orders.id").onDelete("CASCADE")

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
