/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table
      .integer("bill_id")
      .unsigned()
      .notNullable()
      .references("bills.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("description").notNullable();
    table.integer("quantity").notNullable();
    table.decimal("item_total", 8, 2).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("items");
}
