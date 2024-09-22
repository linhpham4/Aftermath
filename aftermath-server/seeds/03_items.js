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
      item_total: 9.03,
    },
    {
      id: 2,
      bill_id: 1,
      description: "Loaded Nachos",
      quantity: 1,
      item_total: 18.06,
    },
    {
      id: 3,
      bill_id: 1,
      description: "Soup of the Day Cup",
      quantity: 1,
      item_total: 6.01,
    },
  ]);
}
