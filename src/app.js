import express, { json } from "express";
import routerProducts from "./routes/products.router.js";
import routerCart from "./routes/carts.router.js";

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Router for Products
app.use('/api/productos', routerProducts)

// Router for Cart
app.use('/api/carts', routerCart)


const port = 8080
app.listen(port, () => console.log(`Connected to ${port} Port`))