// update perchases test case

const request = require("supertest");
const app = require("../../index");
const {
  ID_NOT_FOUND,
  PERCHASES_NOT_UPDATED,
  PERCHASES_UPDATED,
  BEARER_TOKEN,
  TOKEN_NOT_FOUND,
} = require("../../utility/constant");

describe("Update Perchases API", () => {
  test("Update perchases", async () => {
    const bearerToken = BEARER_TOKEN;
    const res = await request(app)
      .post(`/auth/perchases/update`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        id: "66309410bc17b016c6a2cf9d",
        amount: 100,
      });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(PERCHASES_UPDATED);
  });

  test("Without token", async () => {
    const res = await request(app).post(`/auth/perchases/update`).send({
      id: "662fdabfbb984af797188e9c",
      amount: 100,
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(TOKEN_NOT_FOUND);
  });

  test("Empty fields", async () => {
    const bearerToken = BEARER_TOKEN;
    const res = await request(app)
      .post(`/auth/perchases/update`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        id: "",
        amount: 100,
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ID_NOT_FOUND);
  });
});
