import supertest from "supertest";
import assert from "assert";
import * as mocks from "../mocks.js"


const PORT = 8080
const serverBaseURL = `http://localhost:${PORT}`
const httpClient = supertest(serverBaseURL)

describe('sessions router testing', () => {

  describe('POST', () => {

    it('if all is fine should create user', async () => {

      const { headers } = await httpClient.post('/api/sessions/login').send(mocks.userDocument)
      console.log(headers);
    })
  })

  describe('GET', () => {
    describe('ger user if him are logged', () => {
      it('return data of logged user', async () => {
        const { headers } = await httpClient.post('/api/sessions/login').send(mocks.userDocument)
        const cookie = headers['set-cookie'][0]
        const { body } = await httpClient
          .get("/api/sesions/current")
          .set("Cookie", [cookie])
        assert.deepStrictEqual(body, mocks.userDto)
      })
    })
  })
})
