// vocher create test case
const request = require("supertest");
const app = require("../../index");
const {
  VOUCHER_CREATED,
  BEARER_TOKEN,
  TOKEN_NOT_FOUND,
  BRANDNAME_CODE_EXPIRYDATE_COUNT_PRICE_REDEEMED_ITEM_REQUIRED,
} = require("../../utility/constant");
const { randomData } = require("../../utility/Common");

describe("Create Voucher API", () => {
  test("Create voucher", async () => {
    const bearerToken = BEARER_TOKEN;
    const res = await request(app)
      .post(`/auth/voucher/create`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        brandName: randomData(),
        code: [randomData()],
        expiryDate: "2022-12-12",
        codeType: "repeated",
        count: 10,
        price: 10,
        reedemedItem: "10 Rs off",
      });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(VOUCHER_CREATED);
  });

  test("Without token", async () => {
    const res = await request(app)
      .post(`/auth/voucher/create`)
      .send({
        brandName: "Dmart",
        code: [randomData()],
        expiryDate: "2022-12-12",
        codeType: "repeated",
        count: 10,
        price: 10,
        reedemedItem: "10 Rs off",
      });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(TOKEN_NOT_FOUND);
  });

  test("Empty fields", async () => {
    const bearerToken = BEARER_TOKEN;
    const res = await request(app)
      .post(`/auth/voucher/create`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        brandName: "",
        code: [randomData()],
        expiryDate: "2022-12-12",
        codeType: "repeated",
        count: 10,
        price: 10,
        reedemedItem: "10 Rs off",
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      BRANDNAME_CODE_EXPIRYDATE_COUNT_PRICE_REDEEMED_ITEM_REQUIRED
    );
  });
});
