import express, { json } from "express";
import routerProducts from "./routes/products.router.js";
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProducts)



const port = 8080
app.listen(port, () => console.log(`Connected to ${port} Port`))