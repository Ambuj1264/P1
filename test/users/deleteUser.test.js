//delete user test case

const request = require("supertest");
const app = require("../index");
const {
  ID_NOT_FOUND,
  USER_DELETED,
  USER_NOT_FOUND,
  SOME_WENT_WRONG,
} = require("../utility/constant");
const { randomData } = require("../utility/Common");

describe("Delete User API", () => {
  test("Delete user", async () => {
    const res = await request(app)
      .post(`/user/delete`)
      .send({ id: "662f766aba2064529ff28a7e" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(USER_DELETED);
  });

  test("Empty fields", async () => {
    const res = await request(app).post(`/user/delete`).send({ id: "" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ID_NOT_FOUND);
  });

  test("Invalid id", async () => {
    const res = await request(app)
      .post(`/user/delete`)
      .send({ id: `${randomData()}` });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(SOME_WENT_WRONG);
  });
});
