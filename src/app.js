import express from "express";
import routerProducts from "./routes/products.router.js";
import routerCart from "./routes/carts.router.js";
import { Server as SocketIoServer } from "socket.io";
import handlebars from "express-handlebars";
import routerRealTimeProducts from "./routes/realTimeProducts.router.js";
import productsManager from "./manager/ProductManager.js";
import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "./config/mongodbCnxStr.js";
import { productsService } from "./services/products.service.js";
import cartsService from "./services/carts.service.js";
import routerSessionsViews from "./routes/views.router.js";
import { port } from "./config/PortServer.config.js";
import passport from "passport";
import { passportInitialize } from "./middlewares/passport.js";
import { apiRouter } from "./routes/api/api.router.js";
import cookieParser from "cookie-parser";
import { COOKIE_SECRET } from "./config/cookies.config.js";

const app = express()

//Conecting with ATLASDB 
await mongoose.connect(MONGODB_CNX_STR)

app.use('/static', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(cookieParser(COOKIE_SECRET))
// app.use(
//   session({

//     store: MongoStore.create({
//       mongoUrl: MONGODB_CNX_STR,
//       ttl: 10,
//     }),

//     secret: "secretKey",
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 3600
//     },
//   })
// );


//Here I tell to express that he uses passport

app.use(passportInitialize, /*passportSession*/)

// Router for Products
app.use('/api/products', routerProducts)

// Router for Cart
app.use('/api/carts', routerCart)

// Router for Sockets
app.use('/realtimeproducts', routerRealTimeProducts)

// Router for User Sessions
app.use('/api', apiRouter)
// Router for User Sessions Views
app.use('/', routerSessionsViews)
// here I going to use mongo for save user sessions

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
    await cartsService.addNewCart(productToAdd)
    
  })
  // socket.emit('cartById', await cartsService.showCartById()
  // )
}
)


