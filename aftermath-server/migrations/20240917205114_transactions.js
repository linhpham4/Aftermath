/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table
      .integer("item_id")
      .unsigned()
      .notNullable()
      .references("items.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("payment_to_id")
      .unsigned()
      .notNullable()
      .references("people.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("payment_from_id")
      .unsigned()
      .notNullable()
      .references("people.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.decimal("total", 8, 2).notNullable();
    table.boolean("settled");
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
  return knex.schema.dropTable("transactions");
}
