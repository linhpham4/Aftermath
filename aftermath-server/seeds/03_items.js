/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("items").del();
  await knex("items").insert([
    {
      id: 1,
      bill_id: 1,
      description: "Whiskey Old Fashioned",
      quantity: 1,
      item_total: 7.50,
    },
    {
      id: 2,
      bill_id: 1,
      description: "Loaded Nachos",
      quantity: 1,
      item_total: 14.99,
    },
    {
      id: 3,
      bill_id: 1,
      description: "Soup of the Day Cup",
      quantity: 1,
      item_total: 4.99,
    },
  ]);
}
