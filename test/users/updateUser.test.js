//update user test case

const request = require("supertest");
const app = require("../../index");
const { ID_NOT_FOUND } = require("../../utility/constant");
const { randomData } = require("../../utility/Common");

describe("Update User API", () => {
  test("Update user", async () => {
    const res = await request(app)
      .post(`/user/update`)
      .send({
        name: "Ambuj",
        email: `fgz81@data.co}`,
        password: "Ambuj",
        id: "662f6f930c06e05bd898b867",
      });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User updated successfully");
  });

  test("Empty fields", async () => {
    const res = await request(app)
      .post(`/user/update`)
      .send({
        name: "Ambuj",
        email: `${randomData()}@data.co`,
        password: "Ambuj",
        id: "",
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ID_NOT_FOUND);
  });
});
