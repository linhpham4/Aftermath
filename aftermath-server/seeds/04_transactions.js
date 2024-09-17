/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  await knex('transactions').del()
  await knex('transactions').insert([
    {
      id: 1,
      item_id: 1,
      payment_to_id: 1,
      payment_from_id: 1,
      total: 9.03,
      settled: true
    },
    {
      id: 2,
      item_id: 2,
      payment_to_id: 1,
      payment_from_id: 1,
      total: 6.02,
      settled: true
    },
    {
      id: 3,
      item_id: 2,
      payment_to_id: 1,
      payment_from_id: 2,
      total: 6.02,
      settled: true
    },
    {
      id: 4,
      item_id: 2,
      payment_to_id: 1,
      payment_from_id: 3,
      total: 6.02,
      settled: false
    },
    {
      id: 5,
      item_id: 3,
      payment_to_id: 1,
      payment_from_id: 3,
      total: 6.01,
      settled: false
    },
  ]);
};
