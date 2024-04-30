// get perchases test case 

const request = require("supertest");
const app = require("../../index");
const {
    PERCHASES_FETCHED,
    BEARER_TOKEN,
    TOKEN_NOT_FOUND,
    ID_NOT_FOUND,
} = require("../../utility/constant");


describe("Get Perchases API", () => {
    test("Get perchases", async () => {
        const bearerToken = BEARER_TOKEN;
        const res = await request(app)
            .post(`/auth/perchases/getPerchases`)
            .set("Authorization", `Bearer ${bearerToken}`)
            .send({
                id: "66305b103843b45381955ef3",
            });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(PERCHASES_FETCHED);
    });

    test("Without token", async () => {
        const res = await request(app).post(`/auth/perchases/getPerchases`).send({
            id: "62fdabfbb984af797188e9c",
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe(TOKEN_NOT_FOUND);
    });

    test("Empty fields", async () => {
        const bearerToken = BEARER_TOKEN;
        const res = await request(app)
            .post(`/auth/perchases/getPerchases`)
            .set("Authorization", `Bearer ${bearerToken}`)
            .send({
                id: "",
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(ID_NOT_FOUND);
    });
    test("Get All perchases", async () => {
        const bearerToken = BEARER_TOKEN;
        const res = await request(app)
            .post(`/auth/perchases/getAllPerchases`)
            .set("Authorization", `Bearer ${bearerToken}`)
            .send({
           isDeleted:false
            });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(PERCHASES_FETCHED);
    });
    
})
