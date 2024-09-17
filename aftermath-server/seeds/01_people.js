/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("people").del();
  await knex("people").insert([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "password123",
    },
    {
      id: 2,
      name: "Jane",
      email: null,
      password: null,
    },
    {
      id: 3,
      name: "Bob",
      email: null,
      password: null,
    }
  ]);
}