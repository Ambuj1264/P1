//update voucher test case

const request = require("supertest");
const app = require("../../index");
const { VOUCHER_UPDATED, BEARER_TOKEN, TOKEN_NOT_FOUND, ID_NOT_FOUND } = require("../../utility/constant");

describe("Update Voucher API", () => {
    test("Update voucher", async () => {
        const bearerToken = BEARER_TOKEN;
        const res = await request(app)
            .post(`/auth/voucher/update`)
            .set("Authorization", `Bearer ${bearerToken}`)
            .send({
                id: "662fdb2328f646d49ead2079",
                brandName: "brandName",
                code: ["code", "XSFASFASD"],   
                expiryDate: "2022-12-12",
                codeType: "repeated",
                count: 10,
                price: 10,
                reedemedItem: "1000 Rs off",  
            });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(VOUCHER_UPDATED);
    });

    test("Without token", async () => {
        const res = await request(app)
            .post(`/auth/voucher/update`)
            .send({
                id: "662f6f930c06e05bd898b867",
                brandName: "brandName",
                code: ["code", "XSFASFASD"],   
                expiryDate: "2022-12-12",
                codeType: "repeated",
                count: 10,
                price: 10,
                reedemedItem: "1000 Rs off",  
            });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe(TOKEN_NOT_FOUND);
    });

    test("Empty fields", async () => {
        const bearerToken = BEARER_TOKEN;
        const res = await request(app)
            .post(`/auth/voucher/update`)
            .set("Authorization", `Bearer ${bearerToken}`)
            .send({
                id: "",
                brandName: "brandName",
                code: ["code", "XSFASFASD"],   
                expiryDate: "2022-12-12",
                codeType: "repeated",
                count: 10,
                price: 10,
                reedemedItem: "1000 Rs off",
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(ID_NOT_FOUND);
})

});
