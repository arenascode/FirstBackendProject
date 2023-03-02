import express from "express";
import routerProducts from "./routes/products.router.js";
import routerCart from "./routes/carts.router.js";
import { Server as SocketIoServer } from "socket.io";
import handlebars from "express-handlebars";
import routerRealTimeProducts from "./routes/realTimeProducts.router.js";
import productsManager from "./manager/ProductManager.js";

const app = express()
app.use('/static', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

// Router for Products
app.use('/api/products', routerProducts)

// Router for Cart
app.use('/api/carts', routerCart)

// Router for Sockets
app.use('/realtimeproducts', routerRealTimeProducts)

const port = 8080
const conectedServer = app.listen(port, () => console.log(`Connected to ${port} Port`))

const io = new SocketIoServer(conectedServer)

io.on('connection', socket => {
  console.log('New client Connecteed');

  socket.on('addProduct', async prod => {
    await productsManager.addProduct(prod)
    
    socket.emit('showProducts', await productsManager.getProducts())
  })
  
  socket.on('deleteProduct', productToDelete => {
    console.log(JSON.stringify(productToDelete));
  })
}
)


