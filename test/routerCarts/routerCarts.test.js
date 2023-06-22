import assert from "assert";
import supertest from "supertest";
import * as mocks from "../mocks.js";
import { extractTokenFromSignedCookie } from "../utils.js";

const PORT = 8080;
const serverBaseUrl = `http://localhost:${PORT}`;
const httpClient = supertest(serverBaseUrl);

describe("Testing Cart Endpoints", () => {
  // Add product to cart
  describe("Post to Cart endpoint", () => {
    it("if all is fine should create a cart", async () => {
      const { headers } = await httpClient
        .post("/api/sessions/login")
        .send(mocks.userDocument);
      const cookie = headers["set-cookie"][0];
      token = extractTokenFromSignedCookie(cookie)

    const { statusCode, ok, body } = await httpClient.post('/api/carts').send(mocks.productDocument).set('Cookie', `jwt_authorization=${token}`)
    console.log(body);
    assert.ok(ok, "Request Error")
    assert.strictEqual(statusCode, 200)
    });
  });

  describe("Get cart by ID", () => {
    it('a cart must be returned by their ID', async () => {
      const { statusCode, ok, body } = await httpClient.get(
        "/api/carts/6463bf4d2a3c364b7cf26057"
      );
      console.log(body);
      assert.ok(ok, 'Error Request')
      assert.strictEqual(statusCode, 200)
      assert.deepStrictEqual(body, {
        id: "6463bf4d2a3c364b7cf26057",
        user: "6463bdbd5031370f8b1a0776",
        products: [
          {
            _id: "647e6f3d957a3ee0010c0ca4",
            quantity: "1",
          },
        ],
      });
    })
  });

    describe("if cart ID is wrong", () => {
      it("Null must be returned", async () => {
        const { statusCode, ok, body } = await httpClient.get(
          "/api/carts/645c479e3ccd6ebac43646e8"
        );
        console.log(body);
        assert.strictEqual(statusCode, 400);
        assert.ok(ok, "Error Request");
      });
    });
});
