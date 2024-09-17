/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("bills", (table) => {
    table.increments("id").primary();
    table
      .integer("host_id")
      .unsigned()
      .notNullable()
      .references("people.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("restaurant");
    table.decimal("subtotal", 8, 2).notNullable();
    table.decimal("tax", 8, 2).notNullable();
    table.decimal("tip", 8, 2).notNullable();
    table.decimal("total", 8, 2).notNullable();
    table.text("image_url").notNullable();
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
  return knex.schema.dropTable("bills");
}
