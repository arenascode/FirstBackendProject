import express from "express";
import routerProducts from "./routes/products.router.js";
import routerCart from "./routes/carts.router.js";
import { Server as SocketIoServer } from "socket.io";
import handlebars from "express-handlebars";
import routerRealTimeProducts from "./routes/realTimeProducts.router.js";
import productsManager from "./manager/ProductManager.js";
import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "./config/mongodbCnxStr.js";
import productsManagerDB from "./manager/ProductsManager.js";
import { productsService } from "./services/products.service.js";
import cartsService from "./services/carts.service.js";

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

//Conectamos con ATLAS 
await mongoose.connect(MONGODB_CNX_STR)

const port = 8080
const conectedServer = app.listen(port, () => console.log(`Connected to ${port} Port`))


const io = new SocketIoServer(conectedServer)

io.on('connection', async socket => {
  console.log('New client Connecteed');
  
  //This socket use fileSystemManager
  // socket.emit('showProducts', await productsManager.getProducts())
  
  socket.emit('productsList', await productsService.getProducts())

  socket.on('addProduct', async prod => {
    try {
      await productsManager.addProduct(prod)
      socket.emit('showProducts', await productsManager.getProducts())
    } catch (error) {
      console.log({msgError: error});
    }
  })
  
  socket.on('deleteProduct', async idProductToDelete => {
    console.log(idProductToDelete);
    try {
      await productsManager.deleteProduct(idProductToDelete)
      socket.emit('showProducts',await productsManager.getProducts())
    } catch (error) {
      console.log({errorMessage: error});
    }
  })

  socket.on('addProductToCart', async productToAdd => {
    //console.log(`Line 68 app.js ${JSON.stringify(productToAdd)}`);
    await cartsService.addNewCart(productToAdd)
    
  })
  // socket.emit('cartById', await cartsService.showCartById()
  // )
}
)


