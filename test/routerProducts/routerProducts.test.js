import supertest from "supertest";
import assert from "assert";
import { generateAToken } from "../../src/utils/cryptography.js";
import * as mocks from "../mocks.js";
import { extractTokenFromSignedCookie } from "../utils.js";

const PORT = 8080;
const serverBaseUrl = `http://localhost:${PORT}`;
const httpClient = supertest(serverBaseUrl);

describe("testing products endpoints", () => {

// ADD A NEW PRODUCT TESTING
describe("POST Products", () => {
  it("the product must be added succesfully", async () => {
    const { headers } = await httpClient
      .post("/api/sessions/login")
      .send(mocks.adminUserDocument);
    const cookie = headers["set-cookie"][0];
    const token = extractTokenFromSignedCookie(cookie);
    console.log(token);

    const { statusCode, ok, body } = await httpClient
      .post("/api/products")
      .send(mocks.productDocument)
      .set("Cookie", [cookie]);
    // console.log(result);
    console.log(statusCode);
    console.log(ok);
    console.log(body);
    assert.ok(ok, "request error");
    assert.strictEqual(statusCode, 201);
    // assert.ok(id, "ID isnt include in the response");
    // assert.deepStrictEqual()
  });
});

  // GET PRODUCT BY ID TESTING. Approved test!
  describe("Get Product by ID", () => {
    it("a product must be returned and match with ID", async () => {
      const { statusCode, ok, body } = await httpClient.get(
        "/api/products/645c409e3ccd6ebac43446e8"
      );
      console.log(body);
      assert.ok(ok, "request error");
      assert.strictEqual(statusCode, 200);
      assert.deepStrictEqual(body, {
        owner: "admin",
        _id: "645c409e3ccd6ebac43446e8",
        title: "Ducati",
        description: "Panigale V4 R",
        price: 44000,
        code: "001",
        stock: 10,
        status: true,
        category: "Superbike",
        thumbnails: [],
      });
    });
  });

  describe("if product ID is wrong", () => {
    it("Null must be returned", async () => {
      const { statusCode, ok, body } = await httpClient.get(
        "/api/products/645c479e3ccd6ebac43646e8"
      );
      console.log(body);
      assert.ok(ok, "Error Request");
      assert.strictEqual(statusCode, 200);
    });
  });
});
