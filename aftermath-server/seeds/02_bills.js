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
      tip: 0,
      total: 28.98,
      image_url:
        "https://scdn.veryfi.com/receipts/5c65644d6deb80c3/3b8c7c29-b8f3-484f-8ed9-eb5ec2eb06e5/009f4413-b413-4745-b5f0-c8f50b12b190.png?Expires=1727150198&Signature=H20NgKbaDYY4nFtxaBE5XSuOVDXu0KLQajAQyWzodXTL1vu77nlJT9weZmd7QEG7mVr8Y4RdrCX-yj~XlqA1cXjxkf8QOh5hKj4x6dL15Rryk-SDAXg3gP01Hk2MN6flWEeiEq0mmvBVvM4jHPNucYCJwJ33l1z5UW2RBoEE2PxY6iC4UF5~U4tYTG4CYCYi4TYjsnlsn20P20AZU6MmrBEfG445wSfJzbQifMMCmIEIYJTFd-JHFfipMGjTc36JltsLHgxez6HccwCY9pjSmxhkGMRcSZgk7DoUbryGPYkYMMfPwI7e~i1jfRfyVwzRKzNGkKmS2ModQGz0eGAWvw__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ",
    },
    {
      id: 2,
      host_id: 1,
      restaurant: "Good Restaurant",
      subtotal: 31.25,
      tax: 2.62,
      tip: 0,
      total: 33.87,
      image_url:
        "https://scdn.veryfi.com/receipts/5c65644d6deb80c3/294028f9-d6e7-4718-8c75-7134eb17ffa0/8197679e-63f8-4f43-9ed6-4ae5c36335ca.jpg?Expires=1727150168&Signature=Kqb8KvMf7CSjmm67fYY7VJZe7j2IN~B2cDGK1WaVT70UCCvc3A6VrHG7VUVw50~QwnSGKWxjNMKwy0RWYvA9bFCcI9BvDAtwuW6oDUioLIlSlJWxRMElRBCvKeA-uHLKCOZHrnHT0AX5Ws7o~vnVAe01oeXbN4HLbVkj7j2Jia946l87ulty5UJS7ZobXY6ThrNR~meIKbNZeVg3Xtas9c~oukF7d7xXtT2nWFbsqXLWIuYBN73KRiQsriDb8ozdMpnNVenMxag1tF9CGWOif3PIsWIGpRt-wbDTTLztVD022mQsdLeaNAP7dL~WBatAbVPm5KH6t8taYNgf3Rjtmw__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ",
    }
  ]);
};
