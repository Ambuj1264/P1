//delete perchases test case

const request = require("supertest");
const app = require("../../index");
const {
    ID_NOT_FOUND,
    PERCHASES_NOT_DELETED,
    PERCHASES_DELETED,
    BEARER_TOKEN,
    TOKEN_NOT_FOUND,
} = require("../../utility/constant");  

describe("Delete Perchases API", () => {
//   test("Delete perchases", async () => {
//     const bearerToken = BEARER_TOKEN;
//     const res = await request(app)
//       .post(`/auth/perchases/delete`)
//       .set("Authorization", `Bearer ${bearerToken}`)
//       .send({
//         id: "66309410bc17b016c6a2cf9d",
//       });
//     expect(res.status).toBe(200);
//     expect(res.body.message).toBe(PERCHASES_DELETED);
//   });   

  test("Without token", async () => {
    const res = await request(app).post(`/auth/perchases/delete`).send({
      id: "662fdabfbb984af797188e9c",
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(TOKEN_NOT_FOUND);
  });   

  test("Empty fields", async () => {
    const bearerToken = BEARER_TOKEN;
    const res = await request(app)
      .post(`/auth/perchases/delete`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        id: "",
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(ID_NOT_FOUND);
  });
})