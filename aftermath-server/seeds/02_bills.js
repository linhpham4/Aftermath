/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("bills").del();
  await knex("bills").insert([
    {
      id: 1,
      host_id: 1,
      restaurant: "Erin's Snug Pub",
      subtotal: 27.48,
      tax: 1.50,
      tip: 4.12,
      total: 33.10,
      image_url:
        "https://scdn.veryfi.com/receipts/5c65644d6deb80c3/3b8c7c29-b8f3-484f-8ed9-eb5ec2eb06e5/009f4413-b413-4745-b5f0-c8f50b12b190.png?Expires=1726616104&Signature=a5i79vHMcSl~xP87uqhCPu26BOxFRCW1tOKrZ1Or7P8E1AoGZrdzx-lEqPC4v5sNnGjPuduSsCf3aCHnJRwBI-W1WPAOiyV3bnIiXQvT-I~0zseJr24qWFHAyBp6pgVq0G3JBitVG3X06-LVRQqKh6rxMfauevn~N9L5CbuQLLHC9K~gOd9bI5DYzeBaRCsnjtoMCq4ibvsAg68PtBhoaa5E4eOSKc03kJc5x5kdwSfYS8Mb5qGvS8W9dNsH654qmktvJC2Ud~RhkZej53xDpebqGuJa2yHh6ePtAAZCTZpnUYZRrcLlmifTX2gUhnqqxqHaBQnaeB5482bmC0ku3g__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ",
    },
  ]);
};
