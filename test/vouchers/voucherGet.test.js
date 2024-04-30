
// get voucher test case


const request = require("supertest");
const app = require("../../index");
const { VOUCHER_FETCHED, BEARER_TOKEN, TOKEN_NOT_FOUND, ID_NOT_FOUND } = require("../../utility/constant");  

describe("Get Voucher API", () => {
    test("Get voucher", async () => {
        const bearerToken = BEARER_TOKEN;
        const res = await request(app).post(`/auth/voucher/getVoucher`)
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({
            id: "662fdabfbb984af797188e9c"
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(VOUCHER_FETCHED);
    });

    test("Without token", async () => {
        const res = await request(app).post(`/auth/voucher/getVoucher`)
        .send({
            id: "662fdabfbb984af797188e9c"
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe(TOKEN_NOT_FOUND);
    });

    test("Empty fields", async () => {
        const bearerToken = BEARER_TOKEN;
        const res = await request(app).post(`/auth/voucher/getVoucher`)
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({
            id: ""
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(ID_NOT_FOUND);
    })

    test("GET ALL VOUCHER", async () => {       
        const bearerToken = BEARER_TOKEN;
        const res = await request(app).post(`/auth/voucher/getAllVoucher`)
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({
            isDeleted: false
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(VOUCHER_FETCHED);
    })
})  

