// create perchases test case
const request = require("supertest");
const app = require("../../index");
const { 
    USERID_VOCHERID_AMOUNT_REQUIRED,
    PERCHASES_CREATED,
    PERCHASES_NOT_CREATED,   
    BEARER_TOKEN,
    TOKEN_NOT_FOUND
} = require("../../utility/constant");

describe("Create Perchases API", () => {
  test("Create perchases", async () => {
    const bearerToken = BEARER_TOKEN ;
    const res = await request(app)
      .post(`/auth/perchases/create`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        userId: "66308c532639c0de55362efc",
        voucherId: "662fdb929bc4732ec117b452",
        amount: parseInt(Math.random()*100)
      });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(PERCHASES_CREATED);
  });   

  test("Without token", async () => {
    const res = await request(app).post(`/auth/perchases/create`).send({
      userId: "62fdabfbb984af797188e9c",
      voucherId: "62fdabfbb984af797188e9c",
      amount: parseInt(Math.random()*100)
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(TOKEN_NOT_FOUND);
  });

  test("Empty fields", async () => {
    const bearerToken = BEARER_TOKEN;
    const res = await request(app)
      .post(`/auth/perchases/create`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        userId: "",
        voucherId: "62fdabfbb984af797188e9c",
        amount: parseInt(Math.random()*100)
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(USERID_VOCHERID_AMOUNT_REQUIRED);
  });
})  

