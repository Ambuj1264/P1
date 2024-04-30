// vocher create test case
const request = require("supertest");
const app = require("../../index");
const { VOUCHER_CREATED } = require("../../utility/constant");

describe("Create Voucher API", () => {
  test("Create voucher", async () => {
    const res = await request(app).post(`/voucher/create`).send({
      brandName: "Dmart",
      code: "AMBXSGGGRR",
      expiryDate: "2022-12-12",
      codeType: "repeated",
      count: 10,
      price: 10,
      reedemedItem: "10 Rs off",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(VOUCHER_CREATED);
  });

  test("Empty fields", async () => {
    const res = await request(app).post(`/voucher/create`).send({
      brandName: "",
      code: "AMBXSGGGRR",
      expiryDate: "2022-12-12",
      codeType: "repeated",
      count: 10,
      price: 10,
      reedemedItem: "10 Rs off",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  test("Invalid date", async () => {
    const res = await request(app).post(`/voucher/create`).send({
      brandName: "Dmart",
      code: "AMBXSGGGRR",
      expiryDate: "2022-12-13",
      codeType: "repeated",
      count: 10,
      price: 10,
      reedemedItem: "10 Rs off",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid date");
  });

//   test("Invalid count", async () => {
//     const res = await request(app).post(`/voucher/create`).send({
//       brandName: "Dmart",
//       code: "AMBXSGGGRR",
//       expiryDate: "2022-12-12",
//       codeType: "repeated",
//       count: -10,
//       price: 10,
//       reedemedItem: "10 Rs off",
//     });
//     expect(res.status).toBe(400);
//     expect(res.body.message).toBe("Invalid count");
//   });



});
