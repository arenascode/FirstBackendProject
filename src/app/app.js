import express from "express";
import routerCart from "../routes/api/carts.router.js";
import handlebars from "express-handlebars";
import routerRealTimeProducts from "../routes/api/realTimeProducts.router.js";
import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config/mongodbCnxStr.js";
import routerSessionsViews from "../routes/web/views.router.js";
import { PORT } from "../config/PortServer.config.js";
import { passportInitialize } from "../middlewares/passport.js";
import { apiRouter } from "../routes/api/api.router.js";
import cookieParser from "cookie-parser";
import { COOKIE_SECRET } from "../config/cookies.config.js";
import { responseMethods } from "../middlewares/responseMethods.js";
import { routerChat } from "../routes/api/chat.router.js";
import { mockingProductsRouter } from "../routes/api/mockingproducts.router.js";
import { winstonLogger } from "../utils/logger.js";
import { logger } from "../middlewares/logger.js";
import { ENV_DB, envConfig } from "../config/env.config.js";
import { config } from "dotenv";

const app = express()

//Conecting with ATLASDB 
await mongoose.connect(ENV_DB)
winstonLogger.info(`connected to mongodb in ${ENV_DB}`)

app.use('/static', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(cookieParser(COOKIE_SECRET))
app.use(responseMethods)
app.use(logger)

//Here I tell to express that he uses passport
app.use(passportInitialize)

// Router for Cart
app.use('/api/carts', routerCart)

// Router for Sockets
app.use('/realtimeproducts', routerRealTimeProducts)

// Router for Apu
app.use('/api', apiRouter)

// Router for User Sessions Views
app.use('/', routerSessionsViews)

// Router for chat
app.use('/', routerChat)

//Router for Mocks
app.use('/', mockingProductsRouter)

// If the user put a unknow route 
app.get("*", (req, res, next) => {
  res["sendClientError"]("Unknown Route: " + req.url);
});

export const conectedServer = app.listen(PORT, () => winstonLogger.info(`Connected to Port ${PORT} `))
