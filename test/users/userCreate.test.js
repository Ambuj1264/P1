//create user test case

const request = require("supertest");
const app = require("../../index");
const { ALL_FIELDS_REQUIRED } = require("../../utility/constant");
const { randomData } = require("../../utility/Common");

describe("Create User API", () => {
  test("Create user", async () => {
    const res = await request(app)
      .post(`/user/create`)
      .send({
        name: "Ambuj",
        email: `${randomData()}@data.co`,
        password: "Ambuj",
      });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User created successfully");
  });

  test("Empty fields", async () => {
    const res = await request(app)
      .post(`/user/create`)
      .send({ name: "Ambuj", email: "", password: "Ambuj" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ALL_FIELDS_REQUIRED);
  });
});
