// delete voucher test case
const request = require("supertest");
const app = require("../../index");
const {
  VOUCHER_DELETED,
  BEARER_TOKEN,
  TOKEN_NOT_FOUND,
  ID_NOT_FOUND,
} = require("../../utility/constant");

describe("Delete Voucher API", () => {
  // test("Delete voucher", async () => {
  //     const bearerToken = BEARER_TOKEN;
  //     const res = await request(app).post(`/auth/voucher/delete`)
  //     .set("Authorization", `Bearer ${bearerToken}`)
  //     .send({
  //             id: "662fdabfbb984af797188e9c"
  //     });
  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe(VOUCHER_DELETED);
  // });

  test("Without token", async () => {
    const res = await request(app).post(`/auth/voucher/delete`).send({
      id: "662fdabfbb984af797188e9c",
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(TOKEN_NOT_FOUND);
  });

  test("Empty fields", async () => {
    const bearerToken = BEARER_TOKEN;
    const res = await request(app)
      .post(`/auth/voucher/delete`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        id: "",
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ID_NOT_FOUND);
  });
});
