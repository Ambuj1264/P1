const request = require("supertest");
const app = require("../index");
const {
  USER_LOGIN_SUCCESS,
  USER_NOT_FOUND,
  EMAIL_AND_PASSWORD_REQUIRED,
} = require("../utility/constant");

describe("Login API", () => {
  test("Valid login", async () => {
    const res = await request(app)
      .post(`/user/login`)
      .send({ email: "ambuj@gmail", password: "Ambuj" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(USER_LOGIN_SUCCESS);
  });

  test("Invalid email", async () => {
    const res = await request(app)
      .post(`/user/login`)
      .send({ email: "invalidUser", password: "password1" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(USER_NOT_FOUND);
  });

  test("Empty fields", async () => {
    const res = await request(app)
      .post(`/user/login`)
      .send({ email: "", password: "" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(EMAIL_AND_PASSWORD_REQUIRED);
  });

  test("Invalid password", async () => {
    const res = await request(app)
      .post(`/user/login`)
      .send({ email: "user1", password: "invalidPassword" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(USER_NOT_FOUND);
  });
});
