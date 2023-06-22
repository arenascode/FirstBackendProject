import mongoose from "mongoose";

const mongoUrlString = "mongodb://localhost/testproductos";
// const PORT = 3000;

let server

export const mochaHooks = {

  async beforeAll() {
    // await mongoose.connect(mongoUrlString)
    // console.log(`connected to ${mongoUrlString}`);
    // await new Promise((resolve, reject) => {
    //   server = app.listen(PORT, () => {
    //     resolve(true)
    //   })
    //})
  },

  async afterAll() {
    // await mongoose.connection.dropDatabase()
    // await mongoose.connection.close()
    //server.close()
  }
}